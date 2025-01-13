// TODO: add tests

interface IOpts {
	dotSize: number;
	spacing: number;
	offsetX: number;
	offsetY: number;

	isHexagonal: boolean;
	withVars: boolean;

	dotColor: string;
	bgColor: string;
}

export const generatePolkaDotCode = (opts: IOpts): string => {
	if (opts.withVars) return withVars(opts);
	return noVars(opts);
};

const noVars = (opts: IOpts): string => {
	let dotUnit = opts.dotSize + opts.spacing;

	let bgPosCode = `-${opts.offsetX * -1}px ${opts.offsetY * -1}px`;

	let gradientStop = (70.4 * (opts.dotSize / dotUnit)).toFixed(2);
	let bgImageCode = `radial-gradient(${opts.dotColor} ${gradientStop}%,transparent ${gradientStop}%)`;

	if (opts.isHexagonal) {
		const spacingFinal = opts.spacing + opts.dotSize * 0.42;
		dotUnit = opts.dotSize + spacingFinal;

		const base = dotUnit / 2;
		bgPosCode = `${(-opts.offsetX).toFixed(2)}px ${(-opts.offsetY).toFixed(2)}px, ${(-opts.offsetX + base).toFixed(2)}px ${(-opts.offsetY + base).toFixed(2)}px`;

		gradientStop = (70.5 * (opts.dotSize / dotUnit)).toFixed(2);
		bgImageCode = `radial-gradient(${opts.dotColor} ${gradientStop}%,transparent ${gradientStop}%), radial-gradient(${opts.dotColor} ${gradientStop}%,transparent ${gradientStop}%)`;
	}
	const bgSize = dotUnit;

	return `
  .polka-dot-pattern {
    background-image: ${bgImageCode};
    background-size: ${bgSize.toFixed(2)}px ${bgSize.toFixed(3)}px;
    background-position: ${bgPosCode};
    background-color: ${opts.bgColor};
  }
  `;
};

const withVars = (opts: IOpts): string => {
	let bgImageCode =
		"radial-gradient(var(--dot-color) var(--gradient-stop),transparent var(--gradient-stop))";
	let bgPosCode = "var(--offset-x) var(--offset-y)";
	const gradientStopCode = "calc(70.5% * (var(--dot-size) / var(--dot-unit)))";
	const bgSizeCode = "calc(var(--dot-unit) * 1px)";
	let varsCode = "--dot-unit: calc(var(--dot-size) + var(--dot-spacing));";

	if (opts.isHexagonal) {
		varsCode = `
      --dot-spacing-final: calc(var(--dot-spacing) + var(--dot-size) * 0.42); 
      --dot-unit: calc(var(--dot-size) + var(--dot-spacing-final));
      --2d-offset-base: calc((var(--dot-unit) / 2) * 1px);`;
		bgPosCode =
			"var(--offset-x) var(--offset-y), calc(var(--2d-offset-base) + var(--offset-x)) calc(var(--2d-offset-base) + var(--offset-y))";
		bgImageCode =
			"radial-gradient(var(--dot-color) var(--gradient-stop),transparent var(--gradient-stop)),radial-gradient(var(--dot-color) var(--gradient-stop), transparent var(--gradient-stop))";
	}

	return `
  .polka-dot-pattern {
    --dot-size: ${opts.dotSize}; /* no unit */
    --dot-spacing: ${opts.spacing}; /* no unit */
    --offset-x: ${opts.offsetX * -1}px;
    --offset-y: ${opts.offsetY * -1}px;
    --dot-color: ${opts.dotColor};
    --bg-color: ${opts.bgColor};

    ${varsCode}
    --gradient-stop: ${gradientStopCode};
    background-image: ${bgImageCode};
    --bg-size: ${bgSizeCode};
    background-size: var(--bg-size) var(--bg-size);
    background-position: ${bgPosCode};
    background-color: var(--bg-color);
  }
  `;
};
