/** `OSPaths` (API) Determine common OS/platform paths (home, temp, ...) */
interface OSPaths {
    /** Create an `OSPaths` object (preceding `new` is optional). */
    (): OSPaths;
    new (): OSPaths;
    /** Returns the path string of the user's home directory (or `undefined` if the user's home directory is not resolvable). */
    home(): string | undefined;
    /** Returns the path string of the system's default directory for temporary files. */
    temp(): string;
}

declare const _default: OSPaths;

export = _default;
