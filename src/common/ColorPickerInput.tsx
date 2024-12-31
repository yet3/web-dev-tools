import "@thednp/solid-color-picker/style.css";
import { Match, Switch, createEffect, createSignal, onMount } from "solid-js";
import { Dynamic } from "solid-js/web";

interface IProps {
	id?: string;
	value?: string;
	onInput?: (value: string) => void;
	class?: string;
}

// TODO: this is temporary
export const ColorPickerInput = (props: IProps) => {
	const [comp, setComp] = createSignal<any>(null);

	onMount(async () => {
		try {
			const t = await import("@thednp/solid-color-picker");
			setComp(() => t.DefaultColorPicker);
		} catch (e) {
			console.log(e);
		}
	});

	createEffect(() => {
		console.log(comp());
	});

	return (
		<Switch>
			<Match when={!!comp()}>
				<div class="lg:w-[172px] w-full">
					<Dynamic
						component={comp()}
						id={props.id}
						format="hex"
						value={props.value}
						onChange={
							props.onInput
								? (color: string) => props.onInput?.(color)
								: undefined
						}
					/>
				</div>
			</Match>
			<Match when={comp() == null}>
				<input
					id={props.id}
					type="color"
					class={props.class}
					value={props.value}
					onInput={
						props.onInput ? (e) => props.onInput?.(e.target.value) : undefined
					}
				/>
			</Match>
		</Switch>
	);
};
