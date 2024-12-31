// TODO: add tests

interface IOpts {
	lineSize: number;
	spacing: number;
	offset: number;

	isCrossHatch: boolean;
	isRightLeaning: boolean;
	withVars: boolean;

	lineColor: string;
	bgColor: string;
}

export const generateHatchingPatternCode = (opts: IOpts): string => {
	if (opts.withVars) return withVars(opts);
	return noVars(opts);
};

const noVars = (opts: IOpts): string => {
	const ang = opts.isRightLeaning ? -45 : 45;

	const unit = (opts.lineSize + opts.spacing) * 2;
	const lineStop = ((opts.lineSize / unit) * 100) / 2;
	const startStop1st = 75 - lineStop;
	const endStop1st = 75 + lineStop;
	const startStop2ed = 25 - lineStop;
	const endStop2ed = 25 + lineStop;
	const offset = opts.offset * -1;

	let bgImageCode = `linear-gradient(
      ${ang}deg,
      transparent ${startStop1st.toFixed(2)}%,
      ${opts.lineColor} ${startStop1st.toFixed(2)}%,
      ${opts.lineColor} ${endStop1st.toFixed(2)}%,
      transparent ${endStop1st.toFixed(2)}%,
      transparent 100%
    ),
    linear-gradient(
      ${ang}deg,
      transparent ${startStop2ed.toFixed(2)}%,
      ${opts.lineColor} ${startStop2ed.toFixed(2)}%,
      ${opts.lineColor} ${endStop2ed.toFixed(2)}%,
      transparent ${endStop2ed.toFixed(2)}%,
      transparent 100%
    )
  `;

	if (opts.isCrossHatch) {
		bgImageCode += `, linear-gradient(
      ${ang * -1}deg,
      transparent ${startStop1st.toFixed(2)}%,
      ${opts.lineColor} ${startStop1st.toFixed(2)}%,
      ${opts.lineColor} ${endStop1st.toFixed(2)}%,
      transparent ${endStop1st.toFixed(2)}%,
      transparent 100%
    ),
    linear-gradient(
      ${ang * -1}deg,
      transparent ${startStop2ed.toFixed(2)}%,
      ${opts.lineColor} ${startStop2ed.toFixed(2)}%,
      ${opts.lineColor} ${endStop2ed.toFixed(2)}%,
      transparent ${endStop2ed.toFixed(2)}%,
      transparent 100%
    )`;
	}

	return `
  .hatching-pattern {
    background-image: ${bgImageCode};
    background-size: ${unit.toFixed(2)}px ${unit.toFixed(2)}px;
    background-position: ${(opts.spacing * -0.5 + offset).toFixed(2)}px ${offset.toFixed(2)}px;
    background-color: ${opts.bgColor};
  }
`;
};

const withVars = (opts: IOpts): string => {
	let bgImageCode = `linear-gradient(
      var(--ang),
      transparent var(--1st-start-stop),
      var(--line-color) var(--1st-start-stop),
      var(--line-color) var(--1st-end-stop),
      transparent var(--1st-end-stop),
      transparent 100%
    ),
    linear-gradient(
      var(--ang),
      transparent var(--2ed-start-stop),
      var(--line-color) var(--2ed-start-stop),
      var(--line-color) var(--2ed-end-stop),
      transparent var(--2ed-end-stop),
      transparent 100%
    )
  `;

	if (opts.isCrossHatch) {
		bgImageCode += `, linear-gradient(
			calc(var(--ang) * -1),
			transparent var(--1st-start-stop),
			var(--line-color) var(--1st-start-stop),
			var(--line-color) var(--1st-end-stop),
			transparent var(--1st-end-stop),
			transparent 100%
		),
		linear-gradient(
			calc(var(--ang) * -1),
			transparent var(--2ed-start-stop),
			var(--line-color) var(--2ed-start-stop),
			var(--line-color) var(--2ed-end-stop),
			transparent var(--2ed-end-stop),
			transparent 100%
		)`;
	}

	return `
  .hatching-pattern {
    --line-size: ${opts.lineSize}; /* no unit */
    --spacing: ${opts.spacing}; /* no unit */
    --offset: ${opts.offset * -1}px;
    --ang: ${opts.isRightLeaning ? -45 : 45}deg; /* 45deg or -45deg */
    --line-color: ${opts.lineColor};
    --bg-color: ${opts.bgColor};

    --unit: calc((var(--line-size) + var(--spacing)) * 2);
    --line-stop: calc((var(--line-size) / var(--unit) * 100%) / 2);
    --1st-start-stop: calc(75% - var(--line-stop));
    --1st-end-stop: calc(75% + var(--line-stop));
    --2ed-start-stop: calc(25% - var(--line-stop));
    --2ed-end-stop: calc(25% + var(--line-stop));
    background-image: ${bgImageCode};
    background-size: calc(var(--unit) * 1px) calc(var(--unit) * 1px);
    background-position: calc(var(--spacing) * -0.5px + var(--offset)) var(--offset);
    background-color: var(--bg-color);
  }
`;
};
