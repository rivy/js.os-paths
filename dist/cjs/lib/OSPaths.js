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
var Adapt;
(function (Adapt) {
    Adapt.isWinOS = function (adapter_) { return /^win/i.test(adapter_.process.platform); };
    Adapt.normalizePath = function (adapter_) {
        return function (path_) {
            return path_ ? adapter_.path.normalize(adapter_.path.join(path_, '.')) : void 0;
        };
    };
    Adapt.home = function (adapter_) {
        var env = adapter_.env, os = adapter_.os, path = adapter_.path;
        var isWinOS = Adapt.isWinOS(adapter_);
        var normalizePath = Adapt.normalizePath(adapter_);
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
        return isWinOS ? windows : posix;
    };
    Adapt.temp = function (adapter_) {
        var env = adapter_.env, os = adapter_.os, path = adapter_.path;
        var isWinOS = Adapt.isWinOS(adapter_);
        var normalizePath = Adapt.normalizePath(adapter_);
        function joinPathToBase(base, segments) {
            return base ? path.join.apply(path, __spreadArrays([base], segments)) : void 0;
        }
        var posix = function () {
            var fallback = '/tmp';
            var priorityList = [
                typeof os.tmpdir === 'function' ? os.tmpdir() : void 0,
                env.get('TMPDIR'),
                env.get('TEMP'),
                env.get('TMP'),
            ];
            return normalizePath(priorityList.find(function (v) { return !isEmpty(v); })) || fallback;
        };
        var windows = function () {
            var fallback = 'C:\\Temp';
            var priorityListLazy = [
                os.tmpdir,
                function () { return env.get('TEMP'); },
                function () { return env.get('TMP'); },
                function () { return joinPathToBase(env.get('LOCALAPPDATA'), ['Temp']); },
                function () { return joinPathToBase(Adapt.home(adapter_)(), ['AppData', 'Local', 'Temp']); },
                function () { return joinPathToBase(env.get('ALLUSERSPROFILE'), ['Temp']); },
                function () { return joinPathToBase(env.get('SystemRoot'), ['Temp']); },
                function () { return joinPathToBase(env.get('windir'), ['Temp']); },
                function () { return joinPathToBase(env.get('SystemDrive'), ['\\', 'Temp']); },
            ];
            var v = priorityListLazy.find(function (v) { return v && !isEmpty(v()); });
            return (v && normalizePath(v())) || fallback;
        };
        return isWinOS ? windows : posix;
    };
})(Adapt || (Adapt = {}));
function OSPathsAdaptionBuilder_(adapter_) {
    function OSPaths() {
        return obj;
    }
    var home = Adapt.home(adapter_);
    var temp = Adapt.temp(adapter_);
    Object.defineProperty(home, 'name', { value: 'home' });
    Object.defineProperty(temp, 'name', { value: 'temp' });
    var obj = Object.assign(OSPaths, {
        home: home,
        temp: temp
    });
    return obj;
}
exports.OSPathsAdaptionBuilder_ = OSPathsAdaptionBuilder_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1NQYXRocy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvT1NQYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBa0JBLFNBQVMsT0FBTyxDQUFDLENBQTRCO0lBQzVDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBR0QsSUFBVSxLQUFLLENBeUVkO0FBekVELFdBQVUsS0FBSztJQUNELGFBQU8sR0FBRyxVQUFDLFFBQTBCLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQXZDLENBQXVDLENBQUM7SUFFbEYsbUJBQWEsR0FBRyxVQUFDLFFBQTBCO1FBQ3ZELE9BQU8sVUFBQyxLQUF5QjtZQUNoQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVXLFVBQUksR0FBRyxVQUFDLFFBQTBCO1FBQ3RDLElBQUEsR0FBRyxHQUFlLFFBQVEsSUFBdkIsRUFBRSxFQUFFLEdBQVcsUUFBUSxHQUFuQixFQUFFLElBQUksR0FBSyxRQUFRLEtBQWIsQ0FBYztRQUVuQyxJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEQsSUFBTSxLQUFLLEdBQUc7WUFDYixPQUFBLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFD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