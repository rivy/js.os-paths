import { Platform } from '../platform-adapters/_base';
export declare type OSPaths = {
    new (): OSPaths;
    (): OSPaths;
    readonly home: () => string | undefined;
    readonly temp: () => string;
};
export declare function OSPathsAdaptionBuilder_(adapter_: Platform.Adapter): OSPaths;
