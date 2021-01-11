"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.OSPathsAdaptionBuilder_ = void 0;
function isEmpty(s) {
    return !s;
}
function OSPathsAdaptionBuilder_(adapter_) {
    var env = adapter_.env, os = adapter_.os, path = adapter_.path, process = adapter_.process;
    var isWinOS = /^win/i.test(process.platform);
    function normalizePath(path_) {
        return path_ ? path.normalize(path.join(path_, '.')) : void 0;
    }
    var posix = function () {
        var home = function () {
            return normalizePath((typeof os.homedir === 'function' ? os.homedir() : void 0) || env.get('HOME'));
        };
        var temp = function () {
            var fallback = '/tmp';
            var priorityList = [
                typeof os.tmpdir === 'function' ? os.tmpdir() : void 0,
                env.get('TMPDIR'),
                env.get('TEMP'),
                env.get('TMP'),
            ];
            return normalizePath(priorityList.find(function (v) { return !isEmpty(v); })) || fallback;
        };
        return { home: home, temp: temp };
    };
    var windows = function () {
        var home = function () {
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
        function joinPathToBase(base, segments) {
            return base ? path.join.apply(path, __spreadArrays([base], segments)) : void 0;
        }
        var temp = function () {
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
        };
        return { home: home, temp: temp };
    };
    var OSPaths_ = (function () {
        function OSPaths_() {
            var OSPaths = function () {
                return new OSPaths_();
            };
            var platformOS = isWinOS ? windows() : posix();
            OSPaths.home = platformOS.home;
            OSPaths.temp = platformOS.temp;
            return OSPaths;
        }
        return OSPaths_;
    }());
    return new OSPaths_();
}
exports.OSPathsAdaptionBuilder_ = OSPathsAdaptionBuilder_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1NQYXRocy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvT1NQYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBV0EsU0FBUyxPQUFPLENBQUMsQ0FBNEI7SUFDNUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCxTQUFnQix1QkFBdUIsQ0FBQyxRQUEwQjtJQUN6RCxJQUFBLEdBQUcsR0FBd0IsUUFBUSxJQUFoQyxFQUFFLEVBQUUsR0FBb0IsUUFBUSxHQUE1QixFQUFFLElBQUksR0FBYyxRQUFRLEtBQXRCLEVBQUUsT0FBTyxHQUFLLFFBQVEsUUFBYixDQUFjO0lBRTVDLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRS9DLFNBQVMsYUFBYSxDQUFDLEtBQXlCO1FBQy9DLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxJQUFNLEtBQUssR0FBRztRQUNiLElBQU0sSUFBSSxHQUFHO1lBQ1osT0FBQSxhQUFhLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUE1RixDQUE0RixDQUFDO1FBRTlGLElBQU0sSUFBSSxHQUFHO1lBQ1osSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLElBQU0sWUFBWSxHQUFHO2dCQUNwQixPQUFPLEVBQUUsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FB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