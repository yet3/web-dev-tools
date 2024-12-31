import type { Plugin } from "prettier";
import { format } from "prettier/standalone";
import Prism from "prismjs";
import { Suspense, createEffect, createResource } from "solid-js";

interface IProps {
	class?: string;
	codeClass?: string;

	code: string;

	grammar: Prism.Grammar;
	language: string;

	prettierParser: string;
	prettierPlugins: Array<string | Plugin>;
}

export const Code = (props: IProps) => {
	const [data, { refetch }] = createResource(
		async () => {
			try {
				const formatted = await format(props.code, {
					printWidth: 50,
					parser: props.prettierParser,
					plugins: props.prettierPlugins,
				});

				return Prism.highlight(formatted, props.grammar, props.language);
			} catch (e) {
				console.log(e);
			}
			return props.code;
		},
		{
			initialValue: "",
			ssrLoadFrom: "initial",
		},
	);

	createEffect(() => {
		props.code;
		props.prettierParser;
		props.prettierPlugins;
		refetch();
	});

	return (
		<div
			class={props.class}
			classList={{
				"flex p-2 bg-bg w-full overflow-x-auto border border-bg-content": true,
			}}
		>
			<Suspense
				fallback={
					<div class="flex-1 grid place-items-center text-lg">
						Generating...
					</div>
				}
			>
				<pre
					class={props.codeClass}
					classList={{ "language-css pb-1": true }}
					innerHTML={data()}
				/>
			</Suspense>
		</div>
	);
};
