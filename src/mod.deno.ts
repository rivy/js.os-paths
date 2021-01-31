// spell-checker:ignore Deno

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Adapt } from '../dist/esm/lib/OSPaths.mjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type OSPaths from '../dist/types/index.d.ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { adapter } from './platform-adapters/deno.deno.ts';

const default_: typeof OSPaths = Adapt(adapter).OSPaths;

// // ref: <https://github.com/microsoft/TypeScript/issues/28481#issuecomment-453584716>
// export type OSPaths = OSPaths;
export type { OSPaths };
export default default_;
