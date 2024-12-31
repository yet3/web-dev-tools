import { WithLabelReferenceLine } from "@common/WithLabelReferenceLine";
import { type Accessor, Index } from "solid-js";
import type { IBreakdownPart } from "./calcParser";

interface IProps {
	parsedExpression: Accessor<string>;
	computedValue: Accessor<string>;
	breakdown: Accessor<IBreakdownPart[]>;
}

export const CalcResults = (props: IProps) => {
	return (
		<div class="flex flex-wrap lg:gap-4 md:gap-6 gap-8 justify-center">
			<WithLabelReferenceLine
				autoWidth
				label="Parsed expression"
				labelPos="top"
				opacity={0.8}
			>
				{props.parsedExpression()}
			</WithLabelReferenceLine>
			<WithLabelReferenceLine
				autoWidth
				label="Computed value"
				labelPos="top"
				opacity={0.8}
			>
				{props.computedValue()}
			</WithLabelReferenceLine>
			<WithLabelReferenceLine
				autoWidth
				label="Units breakdown"
				labelPos="top"
				opacity={0.8}
			>
				<ul class="flex flex-wrap gap-2">
					<Index each={props.breakdown()}>
						{(item, idx) => (
							<li>
								{item().toCompute} = {item().computed}
								{idx < props.breakdown().length - 1 && ","}
							</li>
						)}
					</Index>
				</ul>
			</WithLabelReferenceLine>
		</div>
	);
};
