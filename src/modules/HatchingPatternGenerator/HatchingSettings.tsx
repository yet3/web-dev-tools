import { RangeWithInput } from "@common/RangeWithInput";
import type { Accessor, Setter } from "solid-js";
import { HATCHING_CONSTS } from "./consts";

interface IProps {
	lineSize: Accessor<number>;
	setLineSize: Setter<number>;

	spacing: Accessor<number>;
	setSpacing: Setter<number>;

	offset: Accessor<number>;
	setOffset: Setter<number>;
}

export const HatchingSettings = (props: IProps) => {
	const maxOffset = () => {
		return props.spacing() + props.lineSize();
	};

	return (
		<>
			<RangeWithInput
				label="Line size"
				inputTopCalss="w-32"
				min={HATCHING_CONSTS.MIN_LINE_SIZE}
				max={HATCHING_CONSTS.MAX_LINE_SIZE}
				value={props.lineSize()}
				onChange={props.setLineSize}
			/>
			<RangeWithInput
				label="Spacing"
				inputTopCalss="w-32"
				min={HATCHING_CONSTS.MIN_SPACING}
				max={HATCHING_CONSTS.MAX_SPACING}
				value={props.spacing()}
				onChange={props.setSpacing}
			/>
			<RangeWithInput
				label="Offset"
				inputTopCalss="w-32"
				min={0}
				max={maxOffset()}
				value={props.offset()}
				onChange={props.setOffset}
			/>
		</>
	);
};
