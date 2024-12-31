const isDigit = (str?: string | null | undefined): boolean => {
	if (!str) return false;
	return /[0-9]/.test(str);
};

const isLetter = (str: string | null | undefined): boolean => {
	if (!str) return false;
	return /[a-zA-Z]/.test(str);
};

const hasNonPxUnit = (str: string): boolean => {
	return /(em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|%)/.test(str);
};

export interface IBreakdownPart {
	toCompute: string;
	computed: string;
}

interface IResult {
	parsedExpression: string;
	breakdown?: IBreakdownPart[];
	computed?: string;
}

interface IOpts {
	fontSize?: string;
	docWidth?: string;
	docHeight?: string;
}

export const parseCalcExpression = (src: string, opts: IOpts = {}): IResult => {
	let currentIdx = 0;

	const nextChar = () => {
		currentIdx++;
	};

	let parsedExpr = "";
	const breakdownParts = new Set<string>();
	while (currentIdx < src.length) {
		const curChar = src[currentIdx];

		if (!curChar) break;

		switch (curChar) {
			case "+":
			case "*":
			case "/": {
				nextChar();
				parsedExpr += ` ${curChar} `;
				break;
			}
			case ",": {
				nextChar();
				parsedExpr += ", ";
				break;
			}
			case "(":
			case ")": {
				nextChar();
				parsedExpr += curChar;
				break;
			}
			// biome-ignore lint/suspicious/noFallthroughSwitchClause:
			case "-": {
				if (!isDigit(src[currentIdx + 1])) {
					nextChar();
					parsedExpr += ` ${curChar} `;
					break;
				}
			}
			default: {
				if (isDigit(curChar) || curChar === "-") {
					let idx = currentIdx;
					let str = "";

					if (curChar === "-") {
						str = "-";
						idx++;
					}

					while (idx < src.length) {
						const char = src[idx];

						if (
							!isDigit(char) &&
							!isLetter(char) &&
							char !== "%" &&
							char !== "."
						) {
							break;
						}

						str += char;
						idx++;
					}

					if (hasNonPxUnit(str)) {
						breakdownParts.add(str);
					}

					parsedExpr += str;
					currentIdx = idx;
					break;
				}

				if (isLetter(curChar)) {
					let idx = currentIdx;
					let str = "";

					let isFunc = false;
					let funcArgs = "";

					while (idx < src.length) {
						const char = src[idx];

						if (char === "(") {
							isFunc = true;
						}

						if (!isFunc && !isLetter(char)) {
							break;
						}
						if (isFunc && char === ")") {
							funcArgs += char;
							idx++;
							break;
						}

						if (!isFunc) {
							str += char;
						} else {
							funcArgs += char;
						}
						idx++;
					}

					if (isFunc) {
						str += parseCalcExpression(funcArgs)?.parsedExpression ?? "";

						if (hasNonPxUnit(funcArgs)) {
							breakdownParts.add(str);
						}
					}

					parsedExpr += str;
					currentIdx = idx;
					break;
				}

				nextChar();
			}
		}
	}

	const iframe = document.createElement("iframe");
	document.body.append(iframe);
	iframe.style.setProperty("width", opts?.docWidth ?? "1920px");
	iframe.style.setProperty("height", opts?.docHeight ?? "1080px");
	iframe.style.setProperty("position", "fixed");
	iframe.style.setProperty("visibility", "hidden");

	const doc = iframe.contentDocument;
	if (!doc) {
		return {
			parsedExpression: parsedExpr,
		};
	}

	doc.documentElement.style.setProperty("font-size", opts.fontSize ?? "16px");

	const el = document.createElement("div");
	doc.body.append(el);

	const getComputedValue = (exp: string): string => {
		el.style.removeProperty("margin-left");
		el.style.setProperty("margin-left", `calc(${exp})`);
		return getComputedStyle(el).getPropertyValue("margin-left");
	};

	const breakdown: IBreakdownPart[] = [];
	for (const toCompute of breakdownParts) {
		breakdown.push({
			toCompute,
			computed: getComputedValue(toCompute),
		});
	}

	const computed = getComputedValue(parsedExpr);

	iframe.remove();

	return {
		parsedExpression: parsedExpr,
		breakdown,
		computed,
	};
};
