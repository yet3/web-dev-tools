import { ColorPickerInput } from "@common/ColorPickerInput";
import { WithLabelReferenceLine } from "@common/WithLabelReferenceLine";
import type { Accessor, Setter } from "solid-js";

interface IProps {
	lineColor: Accessor<string>;
	setLineColor: Setter<string>;

	bgColor: Accessor<string>;
	setBgColor: Setter<string>;
}

export const GridColorPickers = (props: IProps) => {
	const lineColorId = Math.random().toString();
	const bgColorId = Math.random().toString();
	return (
		<div class="grid grid-cols-[1fr_1fr] gap-4">
			<WithLabelReferenceLine label="Line color" for={lineColorId}>
				<ColorPickerInput
					id={lineColorId}
					class="w-full h-12"
					value={props.lineColor()}
					onInput={props.setLineColor}
				/>
			</WithLabelReferenceLine>
			<WithLabelReferenceLine label="Bg color" for={bgColorId}>
				<ColorPickerInput
					id={bgColorId}
					class="w-full h-12"
					value={props.bgColor()}
					onInput={props.setBgColor}
				/>
			</WithLabelReferenceLine>
		</div>
	);
};
