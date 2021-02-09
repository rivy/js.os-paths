/** Determine common OS/platform paths (home, temp, ...) */
declare type OSPaths = {
    /** @constructor Create an `OSPaths` object. */
    (): OSPaths;
    /** @constructor Create an `OSPaths` object. */
    new (): OSPaths;
    /** Returns the path string of the user's home directory (or `undefined` if the user's home directory is not resolvable). */
    home(): string | undefined;
    /** Returns the path string of the system's default directory for temporary files. */
    temp(): string;
};

declare const default_: OSPaths;

export default default_;
export { OSPaths };
