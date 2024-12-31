import { RangeWithInput } from "@common/RangeWithInput";
import { type Accessor, type Setter, createEffect } from "solid-js";
import { POLKA_DOTS_CONSTS } from "./consts";

interface IProps {
	dotSize: Accessor<number>;
	setDotSize: Setter<number>;

	spacing: Accessor<number>;
	setSpacing: Setter<number>;

	offsetX: Accessor<number>;
	setOffsetX: Setter<number>;

	offsetY: Accessor<number>;
	setOffsetY: Setter<number>;
}

export const PolkaSettings = (props: IProps) => {
	createEffect(() => {
		const max = props.spacing() + props.dotSize();
		props.setOffsetX((prev) => Math.min(max, prev));
		props.setOffsetY((prev) => Math.min(max, prev));
	});

	const maxOffset = () => {
		return props.spacing() + props.dotSize();
	};

	return (
		<>
			<RangeWithInput
				label="Dot size"
				inputTopCalss="w-32"
				min={POLKA_DOTS_CONSTS.MIN_DOT_SIZE}
				max={POLKA_DOTS_CONSTS.MAX_DOT_SIZE}
				value={props.dotSize()}
				onChange={props.setDotSize}
			/>
			<RangeWithInput
				label="Spacing"
				inputTopCalss="w-32"
				min={POLKA_DOTS_CONSTS.MIN_SPACING}
				max={POLKA_DOTS_CONSTS.MAX_SPACING}
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
