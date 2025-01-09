import { Button } from "@common/Button";
import { createSignal } from "solid-js";
import { CalcResults } from "./CalcResults";
import { CalcSettings } from "./CalcSettings";
import { type IBreakdownPart, parseCalcExpression } from "./calcParser";

// TODO: At some point I'd like to make an actual tokenizer and parser to generate and AST, and have a fully blown syntax, completion, daiagnostics for calc()

export const CalcCompute = () => {
	const [expression, setExpression] = createSignal("");

	const [parsedExpression, setParsedExpression] = createSignal("");
	const [computedValue, setComptuedValue] = createSignal("");
	const [breakdown, setBreakdown] = createSignal<IBreakdownPart[]>([]);

	const [docWidth, setDocWidth] = createSignal("1920");
	const [docHeight, setDocHeight] = createSignal("1080");
	const [fontSize, setFontSize] = createSignal("16");

	const handleComputeValue = () => {
		const { computed, parsedExpression, breakdown } = parseCalcExpression(
			expression(),
			{
				docWidth: `${docWidth()}px`,
				docHeight: `${docHeight()}px`,
				fontSize: `${fontSize()}px`,
			},
		);

		setComptuedValue(computed ?? "Cannot compute");
		setParsedExpression(parsedExpression);
		setBreakdown(breakdown ?? []);
	};

	return (
		<div class="flex flex-col">
			<CalcSettings
				{...{
					docHeight,
					setDocHeight,
					docWidth,
					setDocWidth,
					setFontSize,
					fontSize,
				}}
			/>

			<div class="grid lg:grid-cols-[1fr_1fr] grid-cols-1 gap-8">
				<div class="grid grid-cols-1 xs:grid-cols-[min-content_auto_min-content] gap-x-1 gap-y-4 w-full content-start">
					<span class="max-xs:hidden">calc(</span>
					<textarea
						value={expression()}
						onInput={(e) => setExpression(e.target.value)}
						class="input-base"
						placeholder="example: 4px * 2.5 + (1mm - 4px)"
						rows={5}
					/>
					<span class="max-xs:hidden self-end">)</span>

					<Button
            disabled={expression().length === 0}
						content="Compute value"
						class="xs:col-start-2 w-full"
						onClick={handleComputeValue}
					/>
				</div>
				<CalcResults {...{ parsedExpression, computedValue, breakdown }} />
			</div>
		</div>
	);
};
