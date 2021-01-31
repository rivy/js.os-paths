import { __spreadArrays } from '../_virtual/_tslib.js';

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

export { Adapt };
