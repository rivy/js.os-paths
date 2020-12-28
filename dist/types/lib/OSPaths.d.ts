export declare type OSPaths = {
    new (): OSPaths;
    (): OSPaths;
    readonly home: () => string | undefined;
    readonly temp: () => string;
};
declare const default_: OSPaths;
export default default_;
