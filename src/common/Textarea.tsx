import { WithLabel } from "./WithLabel";

interface IProps {
	topClass?: string;
	label?: string;
	class?: string;
	id?: string;
	type?: "number" | "text";
	value?: number | string;

	onInput?: (value: string) => void;
	placeholder?: string;
}

export const Textarea = (props: IProps) => {
	return (
		<WithLabel>
			<textarea />
		</WithLabel>
	);
};
