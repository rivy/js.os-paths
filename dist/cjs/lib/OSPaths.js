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
    return path_ ? path.normalize(path.join(path_, '.')) : undefined;
}
var base = function () {
    var env = process.env;
    var home = function () {
        return normalize_path((typeof os.homedir === 'function' ? os.homedir() : undefined) || env.HOME);
    };
    var temp = function () {
        return normalize_path((typeof os.tmpdir === 'function' ? os.tmpdir() : undefined) ||
            env.TMPDIR ||
            env.TEMP ||
            env.TMP) || '/tmp';
    };
    return { home: home, temp: temp };
};
var windows = function () {
    var env = process.env;
    var home = function () {
        return normalize_path((typeof os.homedir === 'function' ? os.homedir() : undefined) ||
            env.USERPROFILE ||
            env.HOME ||
            (env.HOMEDRIVE || env.HOMEPATH
                ? path.join(env.HOMEDRIVE || '', env.HOMEPATH || '')
                : undefined));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1NQYXRocy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvT1NQYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxxQ0FBeUI7QUFDekIseUNBQTZCO0FBUzdCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9DLFNBQVMsY0FBYyxDQUFDLEtBQXlCO0lBQ2hELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUNsRSxDQUFDO0FBRUQsSUFBTSxJQUFJLEdBQUc7SUFDSixJQUFBLEdBQUcsR0FBSyxPQUFPLElBQVosQ0FBYTtJQUV4QixJQUFNLElBQUksR0FBRztRQUNaLE9BQUEsY0FBYyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQXpGLENBQXlGLENBQUM7SUFFM0YsSUFBTSxJQUFJLEdBQUc7UUFDWixPQUFBLGNBQWMsQ0FDYixDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFELEdBQUcsQ0FBQyxNQUFNO1lBQ1YsR0FBRyxDQUFDLElBQUk7WUFDUixHQUFHLENBQUMsR0FBRyxDQUNSLElBQUksTUFBTTtJQUxYLENBS1csQ0FBQztJQUViLE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQztBQUVGLElBQU0sT0FBTyxHQUFHO0lBQ1AsSUFBQSxHQUFHLEdBQUssT0FBTyxJQUFaLENBQWE7SUFFeEIsSUFBTSxJQUFJLEdBQUc7UUFDWixPQUFBLGNBQWMsQ0FDYixDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVELEdBQUcsQ0FBQyxXQUFXO1lBQ2YsR0FBRyxDQUFDLElBQUk7WUFDUixDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLFFBQVE7Z0JBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO2dCQUNwRCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQ2Q7SUFQRCxDQU9DLENBQUM7SUFFSCxJQUFNLElBQUksR0FBRztRQUNaLE9BQUEsY0FBYyxDQUNiLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbkQsR0FBRyxDQUFDLElBQUk7WUFDUixHQUFHLENBQUMsR0FBRztZQUNQLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDN0QsQ0FBQyxVQUFVLENBQUM7Z0JBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMxRCxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNWLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbkUsSUFBSSxDQUFDLElBQUksQ0FDUixHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQ25GLE1BQU0sQ0FDTixDQUNGO0lBYkQsQ0FhQyxDQUFDO0lBRUgsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUM7QUFDdkIsQ0FBQyxDQUFDO0FBR0Y7SUFDQztRQUNDLElBQU0sT0FBTyxHQUFHO1lBQ2YsT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztRQUdGLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUM5QixPQUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFFOUIsT0FBTyxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQUVELElBQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFhLENBQUM7QUFDM0Msa0JBQWUsUUFBUSxDQUFDIn0=