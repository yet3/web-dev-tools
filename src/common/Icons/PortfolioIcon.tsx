import type { JSX } from "solid-js/jsx-runtime";

interface IProps extends JSX.SvgSVGAttributes<SVGSVGElement> {}

export const PortfolioIcon = (props: IProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="22"
			height="20"
			fill="none"
			viewBox="0 0 18 16"
			{...props}
		>
			<title>Portfolio icon</title>
			<path class="fill-bg-content" d="M0 16V3h6V0h6v3h6v13zM7 3h4V1H7z" />
		</svg>
	);
};
