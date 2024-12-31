import type { JSX } from "solid-js";
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

	min?: number;
	max?: number;
}

type IKeyboardHandler = JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent>;

// TODO: make holding the inc/dec button inc/dec value

export const Input = (props: IProps) => {
	let inputEl: HTMLInputElement | null = null;

	const handleIncDec = (by: number) => {
		if (!inputEl) return;
		let value = Number.parseFloat(inputEl.value || "0") + by;
		const minAttr = inputEl.getAttribute("min");
		const maxAttr = inputEl.getAttribute("max");

		const min = minAttr != null ? Number.parseFloat(minAttr) : null;
		const max = maxAttr != null ? Number.parseFloat(maxAttr) : null;

		if (min != null && value < min) value = min;
		else if (max != null && value > max) value = max;

		handleOnInput(value.toString());
	};

	const handleOnInput = (val: string) => {
		if (!inputEl) return;
		if (props.onInput) props.onInput(val);
		inputEl.value = val;
	};

	const handleKeyDown: IKeyboardHandler = (e) => {
		if (props.type !== "number") return;

		const isArrowUp = e.key === "ArrowUp";
		const isArrowDown = e.key === "ArrowDown";

		if (
			!/[0-9\.]/gm.test(e.key) &&
			!["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key) &&
			!e.metaKey &&
			!e.ctrlKey
		) {
			e.preventDefault();
		}

		if (isArrowUp) handleIncDec(1);
		else if (isArrowDown) handleIncDec(-1);
	};

	const id = props.id ?? Math.random().toString();
	return (
		<div class={props.topClass} classList={{ "input-container": true }}>
			<WithLabel label={props.label} for={id}>
				<div class="flex">
					<input
						id={id}
						value={props.value ?? ""}
						onInput={(e) => handleOnInput(e.target.value)}
						ref={(ref) => {
							inputEl = ref;
						}}
						type={props.type === "number" ? "text" : (props.type ?? "text")}
						onKeyDown={handleKeyDown}
						placeholder={props.placeholder}
						class={props.class}
						classList={{ "input-base": true }}
						min={props.min}
						max={props.max}
					/>
					{props.type === "number" && (
						<div class="border border-l-0 border-bg-content w-6 text-sm">
							<button
								onClick={() => handleIncDec(1)}
								class="grid place-items-center w-full cursor-pointer"
								type="button"
							>
								+
							</button>
							<div class="w-full h-[1px] bg-bg-content" />
							<button
								onClick={() => handleIncDec(-1)}
								class="grid place-items-center w-full cursor-pointer"
								type="button"
							>
								-
							</button>
						</div>
					)}
				</div>
			</WithLabel>
		</div>
	);
};
