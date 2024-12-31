import { RangeWithInput } from "@common/RangeWithInput";
import { type Accessor, type Setter, createEffect } from "solid-js";
import { GRID_PATTERN_CONSTS } from "./consts";

interface IProps {
	lineSize: Accessor<number>;
	setLineSize: Setter<number>;

	spacing: Accessor<number>;
	setSpacing: Setter<number>;

	offsetX: Accessor<number>;
	setOffsetX: Setter<number>;

	offsetY: Accessor<number>;
	setOffsetY: Setter<number>;
}

export const GridSettings = (props: IProps) => {
	createEffect(() => {
		const max = props.spacing() + props.lineSize();
		props.setOffsetX((prev) => Math.min(max, prev));
		props.setOffsetY((prev) => Math.min(max, prev));
	});

	const maxOffset = () => {
		return (props.spacing() + props.lineSize()) * 2;
	};

	return (
		<>
			<RangeWithInput
				label="Line size"
				inputTopCalss="w-32"
				min={GRID_PATTERN_CONSTS.MIN_LINE_SIZE}
				max={GRID_PATTERN_CONSTS.MAX_LINE_SIZE}
				value={props.lineSize()}
				onChange={props.setLineSize}
			/>
			<RangeWithInput
				label="Spacing"
				inputTopCalss="w-32"
				min={GRID_PATTERN_CONSTS.MIN_SPACING}
				max={GRID_PATTERN_CONSTS.MAX_SPACING}
				value={props.spacing()}
				onChange={props.setSpacing}
			/>
			<RangeWithInput
				label="Offset x"
				inputTopCalss="w-32"
				min={0}
				max={maxOffset()}
				value={props.offsetX()}
				onChange={props.setOffsetX}
			/>
			<RangeWithInput
				label="Offset y"
				inputTopCalss="w-32"
				min={0}
				max={maxOffset()}
				value={props.offsetY()}
				onChange={props.setOffsetY}
			/>
		</>
	);
};
