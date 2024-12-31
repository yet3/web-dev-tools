import { WithLabel } from "./WithLabel";

interface IProps {
	label?: string;
	value?: boolean;
	onChange?: (val: boolean) => void;
}

export const Checkbox = (props: IProps) => {
	const handleChange = () => {
		if (!props.onChange) return;
		props.onChange(!props.value);
	};

	const id = Math.random().toString();
	return (
		<WithLabel label={props.label} for={id} inline inlinePos="right">
			<button
				id={id}
				type="button"
				class="checkbox-base"
				data-is-checked={props.value}
				onClick={handleChange}
			/>
		</WithLabel>
	);
};
