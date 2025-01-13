import fluid, { extract, screens, fontSize } from "fluid-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
	content: {
		files: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
		extract,
	},
	theme: {
		screens,
		fontSize,
		extend: {
			colors: {
				bg: "var(--color-bg)",
				"bg-content": "var(--color-bg-content)",
			},
			height: {
				header: "var(--height-header)",
			},
			minHeight: {
				header: "var(--height-header)",
			},
			screens: {
				xs: "26.5625rem",
			},
		},
	},
	plugins: [fluid],
};
