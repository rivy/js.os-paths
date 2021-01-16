import { __spreadArrays } from '../_virtual/_tslib.js';

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
        temp: temp,
    });
    return obj;
}

export { OSPathsAdaptionBuilder_ };
