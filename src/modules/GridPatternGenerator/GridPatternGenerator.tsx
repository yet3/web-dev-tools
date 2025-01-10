import "./index.css";
import { Checkbox } from "@common/Checkbox";
import { CssPatternPreview } from "@common/CssPatternPreview";
import { createMemo, createSignal } from "solid-js";
import { GridCodePreview } from "./GridCodePreview";
import { GridColorPickers } from "./GridColorPickers";
import { GridSettings } from "./GridSettings";
import { GRID_PATTERN_CONSTS } from "./consts";
import { generateGridPatternCode } from "./generateGridPatternCode";

// TODO: persist checkboxes state

export const GridPatternGenerator = () => {
	const [withVars, setWithVars] = createSignal(
		GRID_PATTERN_CONSTS.DEFAULT_WITH_VARS,
	);

	const [lineSize, setLineSize] = createSignal(
		GRID_PATTERN_CONSTS.DEFAULT_LINE_SIZE,
	);
	const [cellSize, setCellSize] = createSignal(
		GRID_PATTERN_CONSTS.DEFAULT_SPACING,
	);
	const [offsetX, setOffsetX] = createSignal(0);
	const [offsetY, setOffsetY] = createSignal(0);

	const [lineColor, setLineColor] = createSignal(
		GRID_PATTERN_CONSTS.DEFAULT_LINE_COLOR,
	);
	const [bgColor, setBgColor] = createSignal(
		GRID_PATTERN_CONSTS.DEFAULT_BG_COLOR,
	);

	const code = createMemo(() => {
		return generateGridPatternCode({
			lineSize: lineSize(),
			cellSize: cellSize(),
			offsetX: offsetX(),
			offsetY: offsetY(),
			withVars: withVars(),

			lineColor: lineColor(),
			bgColor: bgColor(),
		});
	});

	return (
		<div class="grid content-start lg:grid-cols-[auto_1fr] gap-12">
			<section class="grid content-start gap-4">
				<Checkbox
					label="Generate config css variables"
					value={withVars()}
					onChange={(v) => setWithVars(v)}
				/>

				<GridColorPickers {...{ lineColor, setLineColor, bgColor, setBgColor }} />

				<GridSettings
					{...{
						lineSize,
						setLineSize,
						cellSize,
						setCellSize,
						offsetX,
						setOffsetX,
						offsetY,
						setOffsetY,
					}}
				/>
			</section>

			<div class="w-full overflow-hidden">
				<CssPatternPreview
					component={"section"}
					patternClass="grid-pattern-generator__preview"
					vars={{
						"--offset-x": `${-offsetX()}px`,
						"--offset-y": `${-offsetY()}px`,
						"--line-size": lineSize(),
						"--cell-size": cellSize(),
						"--line-color": lineColor(),
						"--bg-color": bgColor(),
					}}
				/>

				<GridCodePreview code={code} />
			</div>
		</div>
	);
};
