export declare namespace Platform {
    type Adapter = {
        readonly env: {
            readonly get: (_: string) => string | undefined;
        };
        readonly os: {
            readonly homedir?: () => string;
            readonly tmpdir?: () => string;
        };
        readonly path: {
            readonly join: (..._: readonly string[]) => string;
            readonly normalize: (_: string) => string;
        };
        readonly process: {
            readonly platform: string;
        };
    };
}
