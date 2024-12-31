/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
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
				xs: "425px",
			},
		},
	},
	plugins: [],
};
