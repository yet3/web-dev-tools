import { ColorPickerInput } from "@common/ColorPickerInput";
import { WithLabelReferenceLine } from "@common/WithLabelReferenceLine";
import type { Accessor, Setter } from "solid-js";

interface IProps {
	dotColor: Accessor<string>;
	setDotColor: Setter<string>;

	bgColor: Accessor<string>;
	setBgColor: Setter<string>;
}

export const PolkaColorPickers = (props: IProps) => {
	const dotColorId = Math.random().toString();
	const bgColorId = Math.random().toString();

	return (
		<div class="grid grid-cols-[1fr_1fr] gap-4">
			<WithLabelReferenceLine label="Dot color" for={dotColorId}>
				<ColorPickerInput
					id={dotColorId}
					class="w-full h-12"
					value={props.dotColor()}
					onInput={props.setDotColor}
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
