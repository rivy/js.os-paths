import { Adapt, OSPaths } from './lib/OSPaths.js';
import { adapter } from './platform-adapters/node.js';

export type { OSPaths };
export default Adapt(adapter).OSPaths as OSPaths;
