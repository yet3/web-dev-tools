import { RangeWithInput } from "@common/RangeWithInput";
import { type Accessor, type Setter, createEffect } from "solid-js";
import { GRID_PATTERN_CONSTS } from "./consts";

interface IProps {
	lineSize: Accessor<number>;
	setLineSize: Setter<number>;

	cellSize: Accessor<number>;
	setCellSize: Setter<number>;

	offsetX: Accessor<number>;
	setOffsetX: Setter<number>;

	offsetY: Accessor<number>;
	setOffsetY: Setter<number>;
}

export const GridSettings = (props: IProps) => {
	createEffect(() => {
		const max = props.cellSize() + props.lineSize();
		props.setOffsetX((prev) => Math.min(max, prev));
		props.setOffsetY((prev) => Math.min(max, prev));
	});

	const maxOffset = () => {
		return (props.cellSize() + props.lineSize()) * 2;
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
				label="Cell size"
				inputTopCalss="w-32"
				min={GRID_PATTERN_CONSTS.MIN_SPACING}
				max={GRID_PATTERN_CONSTS.MAX_SPACING}
				value={props.cellSize()}
				onChange={props.setCellSize}
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
