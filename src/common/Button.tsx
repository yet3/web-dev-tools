import { type JSX, type JSXElement, children, splitProps } from "solid-js";

interface IProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	content?: string;
	children?: JSXElement;
}

export const Button = (_props: IProps) => {
	const [localProps, props] = splitProps(_props, ["children", "content"]);
	const c = children(() => localProps.children);

	return (
		<button
			type="button"
			{...props}
			classList={{ "button-base": true, ...props.classList }}
		>
			{c() ?? localProps.content}
		</button>
	);
};
