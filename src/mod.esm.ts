import { Adapt, OSPaths } from './lib/OSPaths.js';
import { adapter } from './platform-adapters/node.js';

const default_: OSPaths = Adapt(adapter).OSPaths;

export type { OSPaths };
export default default_;
