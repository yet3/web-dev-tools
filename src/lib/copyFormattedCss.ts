import cssPlugin from "prettier/plugins/postcss";
import { format } from "prettier/standalone";

interface IOpts {
	withoutClass?: boolean;
}

export const copyFormattedCss = async (src: string, opts: IOpts = {}) => {
	try {
		let code = src.trim();
		if (opts.withoutClass) {
			const lines = code.split("\n");
			code = lines.splice(1, lines.length - 2).join("\n");
		}

		const formatted = await format(code, {
			parser: "css",
			plugins: [cssPlugin],
		});
		await navigator.clipboard.writeText(formatted);
	} catch (e) {
		console.log(e);
		// TODO: handle error in a better way
		alert("Error copying code");
	}
};
