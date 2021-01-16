import { Platform } from '../platform-adapters/_base';
/** Determine common OS/platform paths (home, temp, ...) */
export declare type OSPaths = {
    /** @constructor Create an `OSPaths` object. */
    (): OSPaths;
    /** @constructor Create an `OSPaths` object. */
    new (): OSPaths;
    /** Returns the path string of the user's home directory (or `undefined`if the user's home directory is not resolvable). */
    home(): string | undefined;
    /** Returns the path string of the system's default directory for temporary files. */
    temp(): string;
};
export declare function OSPathsAdaptionBuilder_(adapter_: Platform.Adapter): OSPaths;
