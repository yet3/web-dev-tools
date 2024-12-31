import type { JSX, ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";

interface IProps {
	component: ValidComponent;

	patternClass: string;
	patternDataAttrs?: Record<string, unknown>;
	vars: JSX.CSSProperties;
}

export const CssPatternPreview = (props: IProps) => {
	return (
		<Dynamic
			component={props.component}
			class="hatching-pattern border border-bg-content"
			style={{ padding: "8px" }}
		>
			<div
				{...props.patternDataAttrs}
				class={props.patternClass}
				style={{ ...props.vars }}
			/>
		</Dynamic>
	);
};
