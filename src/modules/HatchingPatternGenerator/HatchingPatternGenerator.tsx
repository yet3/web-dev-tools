import "./index.css";
import { Checkbox } from "@common/Checkbox";
import { CssPatternPreview } from "@common/CssPatternPreview";
import { createEffect, createMemo, createSignal } from "solid-js";
import { HatchingCodePreview } from "./HatchingCodePreview";
import { HatchingColorPickers } from "./HatchingColorPickers";
import { HatchingSettings } from "./HatchingSettings";
import { HATCHING_CONSTS } from "./consts";
import { generateHatchingPatternCode } from "./generateHatchingPatternCode";

// TODO: persist checkboxes state
// TODO: add option to export tileable svg/jpg/png

export const HatchingPatternGenerator = () => {
	const [withVars, setWithVars] = createSignal(
		HATCHING_CONSTS.DEFAULT_WITH_VARS,
	);

	const [isCrossHatch, setIsCrossHatch] = createSignal(
		HATCHING_CONSTS.DEFAULT_CROSS_HATCHING,
	);

	const [isRightLeaning, setIsRightLeaning] = createSignal(
		HATCHING_CONSTS.DEFAULT_RIGHT_LEANING,
	);

	const [lineSize, setLineSize] = createSignal(
		HATCHING_CONSTS.DEFAULT_LINE_SIZE,
	);
	const [spacing, setSpacing] = createSignal(HATCHING_CONSTS.DEFAULT_SPACING);
	const [offset, setOffset] = createSignal(0);

	const [lineColor, setLineColor] = createSignal(
		HATCHING_CONSTS.DEFAULT_LINE_COLOR,
	);
	const [bgColor, setBgColor] = createSignal(HATCHING_CONSTS.DEFAULT_BG_COLOR);

	createEffect(() => {
		const max = spacing() + lineSize();
		setOffset((prev) => Math.min(max, prev));
	});

	const code = createMemo(() => {
		return generateHatchingPatternCode({
			lineSize: lineSize(),
			spacing: spacing(),
			offset: offset(),
			isCrossHatch: isCrossHatch(),
			isRightLeaning: isRightLeaning(),
			withVars: withVars(),
			lineColor: lineColor(),
			bgColor: bgColor(),
		});
	});

	return (
		<div class="grid content-start lg:grid-cols-[auto_1fr] gap-12">
			<section class="grid content-start gap-4">
				<Checkbox
					label="Cross-Hatch"
					value={isCrossHatch()}
					onChange={(v) => setIsCrossHatch(v)}
				/>
				<Checkbox
					label="Right-Leaning (downward from top right to left)"
					value={isRightLeaning()}
					onChange={(v) => setIsRightLeaning(v)}
				/>
				<Checkbox
					label="Generate config css variables"
					value={withVars()}
					onChange={(v) => setWithVars(v)}
				/>

				<HatchingColorPickers
					{...{ lineColor, setLineColor, bgColor, setBgColor }}
				/>

				<HatchingSettings
					{...{
						lineSize,
						setLineSize,
						spacing,
						setSpacing,
						offset,
						setOffset,
					}}
				/>
			</section>

			<div class="w-full overflow-hidden">
				<CssPatternPreview
					component={"section"}
					patternClass="hatching-pattern-generator__preview"
					patternDataAttrs={{
						"data-is-crosshatch": isCrossHatch(),
						"data-is-right-leaning": isRightLeaning(),
					}}
					vars={{
						"--offset": `${-offset()}px`,
						"--line-size": lineSize(),
						"--spacing": spacing(),
						"--line-color": lineColor(),
						"--bg-color": bgColor(),
					}}
				/>

				<HatchingCodePreview code={code} />
			</div>
		</div>
	);
};
