// TODO: add tests

interface IOpts {
	lineSize: number;
	cellSize: number;
	offsetX: number;
	offsetY: number;

	withVars: boolean;

	lineColor: string;
	bgColor: string;
}

export const generateGridPatternCode = (opts: IOpts): string => {
	if (opts.withVars) return withVars(opts);
	return noVars(opts);
};

const noVars = (opts: IOpts): string => {
	const unit = opts.lineSize + opts.cellSize;
	const lineStop = ((opts.lineSize / unit) * 100) / 2;
	const lineStartStop = 50 - lineStop;
	const lineEndStop = 50 + lineStop;
	return `
  .grid-pattern {
    background-image: linear-gradient(
        0deg,
        transparent ${lineStartStop.toFixed(2)}%,
        ${opts.lineColor} ${lineStartStop.toFixed(2)}%,
        ${opts.lineColor} ${lineEndStop.toFixed(2)}%,
        transparent ${lineEndStop.toFixed(2)}%,
        transparent 100%
      ),
      linear-gradient(
        90deg,
        transparent ${lineStartStop.toFixed(2)}%,
        ${opts.lineColor} ${lineStartStop.toFixed(2)}%,
        ${opts.lineColor} ${lineEndStop.toFixed(2)}%,
        transparent ${lineEndStop.toFixed(2)}%,
        transparent 100%
      );

    background-size: ${unit}px ${unit}px;
    background-position: ${opts.offsetX * -1}px ${opts.offsetY * -1}px;
    background-color: ${opts.bgColor};
  }
  `;
};

const withVars = (opts: IOpts): string => {
	return `
  .grid-pattern {
    --line-size: ${opts.lineSize}; /* no unit */
    --cell-size: ${opts.cellSize}; /* no unit */
    --offset-x: ${opts.offsetX * -1}px;
    --offset-y: ${opts.offsetX * -1}px;
    --line-color: ${opts.lineColor};
    --bg-color: ${opts.bgColor};

    --unit: calc(var(--line-size) + var(--cell-size));
    --line-stop: calc((var(--line-size) / var(--unit) * 100%) / 2);
    --line-start-stop: calc(50% - var(--line-stop));
    --line-end-stop: calc(50% + var(--line-stop));
    background-image: linear-gradient(
        0deg,
        transparent var(--line-start-stop),
        var(--line-color) var(--line-start-stop),
        var(--line-color) var(--line-end-stop),
        transparent var(--line-end-stop),
        transparent 100%
      ),
      linear-gradient(
        90deg,
        transparent var(--line-start-stop),
        var(--line-color) var(--line-start-stop),
        var(--line-color) var(--line-end-stop),
        transparent var(--line-end-stop),
        transparent 100%
      );

    background-size: calc(var(--unit) * 1px) calc(var(--unit) * 1px);
    background-position: var(--offset-x) var(--offset-y);
    background-color: var(--bg-color);
  }
  `;
};
