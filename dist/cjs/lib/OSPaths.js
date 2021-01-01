"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var os = __importStar(require("os"));
var path = __importStar(require("path"));
var env = process.env;
var isWinOS = /^win/i.test(process.platform);
function isEmpty(s) {
    return !s;
}
function normalizePath(path_) {
    return path_ ? path.normalize(path.join(path_, '.')) : void 0;
}
var posix = function () {
    var home = function () {
        return normalizePath((typeof os.homedir === 'function' ? os.homedir() : void 0) || env.HOME);
    };
    var temp = function () {
        var fallback = '/tmp';
        var priorityList = [
            typeof os.tmpdir === 'function' ? os.tmpdir() : void 0,
            env.TMPDIR,
            env.TEMP,
            env.TMP,
        ];
        return normalizePath(priorityList.find(function (v) { return !isEmpty(v); })) || fallback;
    };
    return { home: home, temp: temp };
};
var windows = function () {
    var home = function () {
        var priorityList = [
            typeof os.homedir === 'function' ? os.homedir() : void 0,
            env.USERPROFILE,
            env.HOME,
            env.HOMEDRIVE || env.HOMEPATH ? path.join(env.HOMEDRIVE || '', env.HOMEPATH || '') : void 0,
        ];
        return normalizePath(priorityList.find(function (v) { return !isEmpty(v); }));
    };
    var temp = function () {
        var fallback = 'C:\\Temp';
        var priorityList = [
            typeof os.tmpdir === 'function' ? os.tmpdir() : void 0,
            env.TEMP,
            env.TMP,
            env.LOCALAPPDATA ? path.join(env.LOCALAPPDATA, 'Temp') : void 0,
            (function (s) {
                return s ? path.join(s, 'AppData', 'Local', 'Temp') : void 0;
            })(home()),
            env.ALLUSERSPROFILE ? path.join(env.ALLUSERSPROFILE, 'Temp') : void 0,
            env.SystemRoot ? path.join(env.SystemRoot, 'Temp') : void 0,
            env.windir ? path.join(env.windir, 'Temp') : void 0,
            env.SystemDrive ? path.join(env.SystemDrive + '\\', 'Temp') : void 0,
        ];
        return normalizePath(priorityList.find(function (v) { return !isEmpty(v); })) || fallback;
    };
    return { home: home, temp: temp };
};
var _OSPaths = (function () {
    function _OSPaths() {
        var OSPaths = function () {
            return new _OSPaths();
        };
        var extension = isWinOS ? windows() : posix();
        OSPaths.home = extension.home;
        OSPaths.temp = extension.temp;
        return OSPaths;
    }
    return _OSPaths;
}());
var default_ = new _OSPaths();
exports.default = default_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1NQYXRocy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvT1NQYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxxQ0FBeUI7QUFDekIseUNBQTZCO0FBU3JCLElBQUEsR0FBRyxHQUFLLE9BQU8sSUFBWixDQUFhO0FBRXhCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9DLFNBQVMsT0FBTyxDQUFDLENBQTRCO0lBQzVDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsS0FBeUI7SUFDL0MsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELElBQU0sS0FBSyxHQUFHO0lBQ2IsSUFBTSxJQUFJLEdBQUc7UUFDWixPQUFBLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQXJGLENBQXFGLENBQUM7SUFFdkYsSUFBTSxJQUFJLEdBQUc7UUFDWixJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBTSxZQUFZLEdBQUc7WUFDcEIsT0FBTyxFQUFFLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdEQsR0FBRyxDQUFDLE1BQU07WUFDVixHQUFHLENBQUMsSUFBSTtZ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