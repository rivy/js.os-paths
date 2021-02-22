import { Adapt, OSPaths } from './lib/OSPaths.js';
import { adapter } from './platform-adapters/node.js';

const _: OSPaths = Adapt(adapter).OSPaths as OSPaths;

export type { OSPaths };
export default _;
