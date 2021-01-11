// spell-checker:ignore Deno
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { OSPathsAdaptionBuilder_ } from '../dist/esm/lib/OSPaths.mjs';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { adapter } from './platform-adapters/deno.deno.ts';

const default_ = OSPathsAdaptionBuilder_(adapter);
export default default_;
