import { type JSXElement, children } from "solid-js";
import { Dynamic } from "solid-js/web";

interface IProps {
	label?: string;
	for?: string;

	opacity?: number;
	labelPos?: "top" | "bot";

	contentWrapperClass?: string;
	children: JSXElement;

	autoWidth?: boolean;
}

export const WithLabelReferenceLine = (props: IProps) => {
	const c = children(() => props.children);

	if (!props.label) {
		return <div class={props.contentWrapperClass}>{c()}</div>;
	}

	const isPosTop = () => {
		return props.labelPos !== "bot";
	};

	const opacity = () => {
		return props.opacity ?? 1;
	};

	const isAutoWidth = () => {
		return !!props.autoWidth;
	};

	return (
		<div
			classList={{
				"label-reference-line-container": true,
				"w-fit": isAutoWidth(),
			}}
		>
			<Dynamic
				component={props.for ? "label" : "div"}
				classList={{
					"label-reference-line": true,
					"order-1": !isPosTop(),
				}}
				for={props.for}
			>
				<span
					classList={{ "px-3": isAutoWidth() }}
					style={{ opacity: opacity() }}
				>
					{props.label}
				</span>
				<div
					classList={{
						flex: true,
						"items-start": isPosTop(),
						"items-end -order-1": !isPosTop(),
					}}
				>
					<div
						class="w-[1px] h-[7px] bg-bg-content"
						style={{ opacity: opacity() }}
					/>
					<div
						class="w-full h-[1px] bg-bg-content"
						style={{ opacity: opacity() }}
					/>
					<div
						class="w-[1px] h-[7px] bg-bg-content"
						style={{ opacity: opacity() }}
					/>
				</div>
			</Dynamic>
			<div
				class={props.contentWrapperClass}
				classList={{
					flex: true,
					"px-1.5": !isAutoWidth(),
					"px-3 justify-center": isAutoWidth(),
				}}
			>
				{c()}
			</div>
		</div>
	);
};
