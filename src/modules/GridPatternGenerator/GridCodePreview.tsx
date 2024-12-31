import { Button } from "@common/Button";
import { Code } from "@common/Code";
import { copyFormattedCss } from "@lib/copyFormattedCss";
import cssPlugin from "prettier/plugins/postcss";
import Prism from "prismjs";
import type { Accessor } from "solid-js";

interface IProps {
	code: Accessor<string>;
}

// TODO: add some indication that the code was copied
export const GridCodePreview = (props: IProps) => {
	return (
		<section class="mt-6">
			<div class="flex space-x-2 mb-2">
				<Button
					content="Copy code"
					onClick={() => copyFormattedCss(props.code())}
				/>
				<Button
					content="Copy code without class"
					onClick={() => copyFormattedCss(props.code(), { withoutClass: true })}
				/>
			</div>
			<Code
				code={props.code()}
				class="min-h-[300px]"
				codeClass="text-xs!"
				grammar={Prism.languages.css}
				language="css"
				prettierParser="css"
				prettierPlugins={[cssPlugin]}
			/>
		</section>
	);
};
