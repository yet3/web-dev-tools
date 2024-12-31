import { Input } from "@common/Input";
import type { Accessor, Setter } from "solid-js";

interface IProps {
	fontSize: Accessor<string>;
	setFontSize: Setter<string>;

	docWidth: Accessor<string>;
	setDocWidth: Setter<string>;

	docHeight: Accessor<string>;
	setDocHeight: Setter<string>;
}

export const CalcSettings = (props: IProps) => {
	return (
		<div class="flex not-xs:flex-col xs:flex-wrap gap-x-10 gap-y-6 mb-12 justify-center items-center">
			<Input
				label="1rem = ?px"
				type="number"
				value={props.fontSize()}
				onInput={(v) => props.setFontSize(v)}
				class="text-right w-32"
				placeholder="16"
			/>

			<Input
				label="Doc width = ?px"
				type="number"
				value={props.docWidth()}
				onInput={(v) => props.setDocWidth(v)}
				class="text-right w-32"
				placeholder="1920"
			/>

			<Input
				label="Doc height = ?px"
				type="number"
				value={props.docHeight()}
				onInput={(v) => props.setDocHeight(v)}
				class="text-right w-32"
				placeholder="1080"
			/>
		</div>
	);
};
