import { Input } from "./Input";
import { RangeSlider } from "./RangeSlider";
import { WithLabelReferenceLine } from "./WithLabelReferenceLine";

interface IProps {
	label?: string;

	value: number;
	onChange: (val: number) => void;

	min: number;
	max: number;

	inputTopCalss?: string;
}

export const RangeWithInput = (props: IProps) => {
	const id = Math.random().toString();
	return (
		<WithLabelReferenceLine
			label={props.label}
			opacity={0.8}
			contentWrapperClass="flex items-end gap-4 mt-2 w-full lg:w-96"
			for={id}
		>
			<RangeSlider
				id={id}
				showMinMax
				min={props.min}
				max={props.max}
				value={props.value}
				onInput={props.onChange}
			/>
			<Input
				type="number"
				topClass={props.inputTopCalss}
				class="text-right"
				value={props.value}
				min={props.min}
				max={props.max}
				onInput={(v) => {
					const parsed = Number(v);
					if (Number.isNaN(parsed)) return;
					props.onChange(parsed);
				}}
			/>
		</WithLabelReferenceLine>
	);
};
