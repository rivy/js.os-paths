// ref: <https://devhints.io/rollup>
// setup: `npm i rollup @rollup/plugin-typescript` or `npm i rollup rollup-plugin-typescript2` (for visible TS error output)

import dts from 'rollup-plugin-dts';

export default [
	// bundle TypeScript typings (TypeScript is unable/unwilling to do so...)
	// * ref: <https://github.com/Microsoft/TypeScript/issues/4433> , <https://github.com/google/model-viewer/issues/1502>
	// * ref: <https://github.com/Swatinem/rollup-plugin-dts>
	{
		input: './build/types/index.d.ts',
		output: [{ file: './dist/types/index.d.ts', format: 'es' }],
		plugins: [dts()],
	},
];
