import type { JSX } from "solid-js";

interface IProps {
	id?: string;

	value?: number;
	onInput?: (val: number) => void;

	min?: number;
	max?: number;
  step?: number

	showMinMax?: boolean;
}

const calcVal = (value: number, min: number, max: number): string => {
	return `${Math.min(100, ((value - min) * 100) / (max - min))}%`;
};

type IInputHandler = JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent>;

export const RangeSlider = (props: IProps) => {
	let inputEl: HTMLInputElement | null = null;

	const min = () => {
		return props.min ?? 0;
	};
	const max = () => {
		return props.max ?? 100;
	};
	const value = () => {
		return props.value ?? 50;
	};

	const handleOnInput: IInputHandler = (e) => {
		const target = e.target;
		const container = target.parentElement;

		if (!(container instanceof HTMLDivElement)) return;

		const min = Number(target.min);
		const max = Number(target.max);
		const val = Number(target.value);

		container.style.setProperty("--val", calcVal(val, min, max));
		if (props.onInput) {
			props.onInput(val);
		}
	};

	return (
		<div class="flex flex-col w-full">
			{props.showMinMax && (
				<>
					<div class="flex justify-between">
						<span>{min()}</span>
						<span>{max()}</span>
					</div>
					<div class="w-full h-1 border-l border-r border-bg-content" />
				</>
			)}

			<div
				class="input-range-container"
				style={{
					"--val": calcVal(value(), min(), max()),
				}}
			>
				<input
					id={props.id}
					ref={(r) => {
						inputEl = r;
					}}
					type="range"
          step={props.step}
					value={props.value}
					onInput={handleOnInput}
					min={min()}
					max={max()}
				/>
			</div>
		</div>
	);
};
