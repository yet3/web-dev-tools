import "./index.css";
import { Checkbox } from "@common/Checkbox";
import { CssPatternPreview } from "@common/CssPatternPreview";
import { createMemo, createSignal } from "solid-js";
import { PolkaCodePreview } from "./PolkaCodePreview";
import { PolkaColorPickers } from "./PolkaColorPickers";
import { PolkaSettings } from "./PolkaSettings";
import { POLKA_DOTS_CONSTS } from "./consts";
import { generatePolkaDotCode } from "./generatePolkaDotCode";

// TODO: persist checkboxes state

export const PolkaDotGenerator = () => {
	const [withVars, setWithVars] = createSignal(
		POLKA_DOTS_CONSTS.DEFAULT_WITH_VARS,
	);
	const [isHex, setIsHex] = createSignal(POLKA_DOTS_CONSTS.DEFAULT_HEX);

	const [dotSize, setDotSize] = createSignal(
		POLKA_DOTS_CONSTS.DEFAULT_DOT_SIZE,
	);
	const [spacing, setSpacing] = createSignal(POLKA_DOTS_CONSTS.DEFAULT_SPACING);
	const [offsetX, setOffsetX] = createSignal(0);
	const [offsetY, setOffsetY] = createSignal(0);

	const [dotColor, setDotColor] = createSignal(
		POLKA_DOTS_CONSTS.DEFAULT_DOT_COLOR,
	);
	const [bgColor, setBgColor] = createSignal(
		POLKA_DOTS_CONSTS.DEFAULT_BG_COLOR,
	);

	const code = createMemo(() => {
		return generatePolkaDotCode({
			dotSize: dotSize(),
			spacing: spacing(),
			offsetX: offsetX(),
			offsetY: offsetY(),
			isHexagonal: isHex(),
			withVars: withVars(),

			dotColor: dotColor(),
			bgColor: bgColor(),
		});
	});

	return (
		<div class="grid content-start lg:grid-cols-[auto_1fr] gap-12">
			<section class="grid content-start gap-4">
				<Checkbox
					label="Hexagonal polka dot"
					value={isHex()}
					onChange={(v) => setIsHex(v)}
				/>
				<Checkbox
					label="Generate config css variables"
					value={withVars()}
					onChange={(v) => setWithVars(v)}
				/>

				<PolkaColorPickers
					{...{ dotColor, setDotColor, bgColor, setBgColor }}
				/>

				<PolkaSettings
					{...{
						dotSize,
						setDotSize,
						spacing,
						setSpacing,
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
					patternClass="polka-dot-generator__preview"
					patternDataAttrs={{
						"data-is-hexagonal": isHex(),
					}}
					vars={{
						"--offset-x": `${-offsetX()}px`,
						"--offset-y": `${-offsetY()}px`,
						"--dot-size": dotSize(),
						"--dot-spacing": spacing(),
						"--dot-color": dotColor(),
						"--bg-color": bgColor(),
					}}
				/>

				<PolkaCodePreview code={code} />
			</div>
		</div>
	);
};
