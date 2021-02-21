import { Adapt, OSPaths } from './lib/OSPaths.js';
import { adapter } from './platform-adapters/node.js';

export = Adapt(adapter).OSPaths as OSPaths;
