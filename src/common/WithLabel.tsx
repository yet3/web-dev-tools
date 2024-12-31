import { type JSXElement, children } from "solid-js";
import { Dynamic } from "solid-js/web";

interface IProps {
	label?: string;
	for?: string;

	inline?: boolean;
	inlinePos?: "left" | "right";

	labelGap?: string;
	children: JSXElement;
}

export const WithLabel = (props: IProps) => {
	const c = children(() => props.children);

	if (!props.label) return c();

	const isLabelOnRight = () => {
		return props.inlinePos === "right";
	};

	return (
		<div
			classList={{
				flex: true,
				"flex-col": !props.inline,
				"items-center": !!props.inline,
			}}
		>
			<Dynamic
				component={props.for ? "label" : "div"}
				classList={{ label: true, "order-1": isLabelOnRight() }}
				for={props.for}
				style={{
					"margin-right": props.inline
						? (props.labelGap ?? "0.5rem")
						: undefined,

					"margin-left":
						props.inline && isLabelOnRight()
							? (props.labelGap ?? "0.5rem")
							: undefined,

					"margin-bottom": props.inline ? undefined : props.labelGap,
				}}
			>
				{props.label}
			</Dynamic>
			{c()}
		</div>
	);
};
