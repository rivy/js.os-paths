import { __spreadArrays } from '../_virtual/_tslib.js';

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

export { OSPathsAdaptionBuilder_ };
