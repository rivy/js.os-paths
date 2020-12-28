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
var isWinOS = /^win/i.test(process.platform);
function normalize_path(path_) {
    return path_ ? path.normalize(path.join(path_, '.')) : void 0;
}
var base = function () {
    var env = process.env;
    var home = function () {
        return normalize_path((typeof os.homedir === 'function' ? os.homedir() : void 0) || env.HOME);
    };
    var temp = function () {
        return normalize_path((typeof os.tmpdir === 'function' ? os.tmpdir() : void 0) || env.TMPDIR || env.TEMP || env.TMP) || '/tmp';
    };
    return { home: home, temp: temp };
};
var windows = function () {
    var env = process.env;
    var home = function () {
        return normalize_path((typeof os.homedir === 'function' ? os.homedir() : void 0) ||
            env.USERPROFILE ||
            env.HOME ||
            (env.HOMEDRIVE || env.HOMEPATH
                ? path.join(env.HOMEDRIVE || '', env.HOMEPATH || '')
                : void 0));
    };
    var temp = function () {
        return normalize_path((typeof os.tmpdir === 'function' ? os.tmpdir() : '') ||
            env.TEMP ||
            env.TMP ||
            (env.LOCALAPPDATA ? path.join(env.LOCALAPPDATA, 'Temp') : '') ||
            (function (s) {
                return s ? path.join(s, 'AppData', 'Local', 'Temp') : '';
            })(home()) ||
            (env.ALLUSERSPROFILE ? path.join(env.ALLUSERSPROFILE, 'Temp') : '') ||
            path.join(env.SystemRoot || env.windir || (env.SystemDrive ? env.SystemDrive + '\\' : 'C:\\'), 'Temp'));
    };
    return { home: home, temp: temp };
};
var _OSPaths = (function () {
    function _OSPaths() {
        var OSPaths = function () {
            return new _OSPaths();
        };
        var extension = isWinOS ? windows() : base();
        OSPaths.home = extension.home;
        OSPaths.temp = extension.temp;
        return OSPaths;
    }
    return _OSPaths;
}());
var default_ = new _OSPaths();
exports.default = default_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1NQYXRocy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvT1NQYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxxQ0FBeUI7QUFDekIseUNBQTZCO0FBUzdCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9DLFNBQVMsY0FBYyxDQUFDLEtBQXlCO0lBQ2hELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFFRCxJQUFNLElBQUksR0FBRztJQUNKLElBQUEsR0FBRyxHQUFLLE9BQU8sSUFBWixDQUFhO0lBRXhCLElBQU0sSUFBSSxHQUFHO1FBQ1osT0FBQSxjQUFjLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztJQUF0RixDQUFzRixDQUFDO0lBRXhGLElBQU0sSUFBSSxHQUFHO1FBQ1osT0FBQSxjQUFjLENBQ2IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQzdGLElBQUksTUFBTTtJQUZYLENBRVcsQ0FBQztJQUViLE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLE1BQUEs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