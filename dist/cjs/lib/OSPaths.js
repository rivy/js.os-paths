"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Adapt = void 0;
function isEmpty(s) {
    return !s;
}
function Adapt(adapter_) {
    var env = adapter_.env, os = adapter_.os, path = adapter_.path;
    var isWinOS = /^win/i.test(adapter_.process.platform);
    function normalizePath(path_) {
        return path_ ? adapter_.path.normalize(adapter_.path.join(path_, '.')) : void 0;
    }
    function home() {
        var posix = function () {
            return normalizePath((typeof os.homedir === 'function' ? os.homedir() : void 0) || env.get('HOME'));
        };
        var windows = function () {
            var priorityList = [
                typeof os.homedir === 'function' ? os.homedir() : void 0,
                env.get('USERPROFILE'),
                env.get('HOME'),
                env.get('HOMEDRIVE') || env.get('HOMEPATH')
                    ? path.join(env.get('HOMEDRIVE') || '', env.get('HOMEPATH') || '')
                    : void 0,
            ];
            return normalizePath(priorityList.find(function (v) { return !isEmpty(v); }));
        };
        return isWinOS ? windows() : posix();
    }
    function temp() {
        function joinPathToBase(base, segments) {
            return base ? path.join.apply(path, __spreadArrays([base], segments)) : void 0;
        }
        function posix() {
            var fallback = '/tmp';
            var priorityList = [
                typeof os.tmpdir === 'function' ? os.tmpdir() : void 0,
                env.get('TMPDIR'),
                env.get('TEMP'),
                env.get('TMP'),
            ];
            return normalizePath(priorityList.find(function (v) { return !isEmpty(v); })) || fallback;
        }
        function windows() {
            var fallback = 'C:\\Temp';
            var priorityListLazy = [
                os.tmpdir,
                function () { return env.get('TEMP'); },
                function () { return env.get('TMP'); },
                function () { return joinPathToBase(env.get('LOCALAPPDATA'), ['Temp']); },
                function () { return joinPathToBase(home(), ['AppData', 'Local', 'Temp']); },
                function () { return joinPathToBase(env.get('ALLUSERSPROFILE'), ['Temp']); },
                function () { return joinPathToBase(env.get('SystemRoot'), ['Temp']); },
                function () { return joinPathToBase(env.get('windir'), ['Temp']); },
                function () { return joinPathToBase(env.get('SystemDrive'), ['\\', 'Temp']); },
            ];
            var v = priorityListLazy.find(function (v) { return v && !isEmpty(v()); });
            return (v && normalizePath(v())) || fallback;
        }
        return isWinOS ? windows() : posix();
    }
    var OSPaths_ = (function () {
        function OSPaths_() {
            function OSPaths() {
                return new OSPaths_();
            }
            OSPaths.home = home;
            OSPaths.temp = temp;
            return OSPaths;
        }
        return OSPaths_;
    }());
    return { OSPaths: new OSPaths_() };
}
exports.Adapt = Adapt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1NQYXRocy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvT1NQYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBdUJBLFNBQVMsT0FBTyxDQUFDLENBQTRCO0lBQzVDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsUUFBMEI7SUFDaEMsSUFBQSxHQUFHLEdBQWUsUUFBUSxJQUF2QixFQUFFLEVBQUUsR0FBVyxRQUFRLEdBQW5CLEVBQUUsSUFBSSxHQUFLLFFBQVEsS0FBYixDQUFjO0lBRW5DLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV4RCxTQUFTLGFBQWEsQ0FBQyxLQUF5QjtRQUMvQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCxTQUFTLElBQUk7UUFDWixJQUFNLEtBQUssR0FBRztZQUNiLE9BQUEsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFBNUYsQ0FBNEYsQ0FBQztRQUU5RixJQUFNLE9BQU8sR0FBRztZQUNmLElBQU0sWUFBWSxHQUFHO2dCQUNwQixPQUFPLEVBQUUsQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxD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