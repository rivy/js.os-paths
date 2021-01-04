/* eslint complexity: ['error', { max: 10 }] */ // set maximum cyclomatic complexity to 10; ref: <https://eslint.org/docs/rules/complexity>
// # spell-checker:ignore AllUsersProfile HomeDrive HomePath LocalAppData UserProfile WinDir cyclomatic falsey

import * as os from 'os';
import * as path from 'path';

export type OSPaths = {
	new (): OSPaths;
	(): OSPaths;
	readonly home: () => string | undefined;
	readonly temp: () => string;
	readonly main: () => string;
};

const { env } = process;

const isWinOS = /^win/i.test(process.platform);

function isEmpty(s: string | null | undefined): boolean {
	return !s; // reminder: JS "falsey" == [undefined, null, NaN, 0, '', false]
}

function normalizePath(path_: string | undefined): string | undefined {
	return path_ ? path.normalize(path.join(path_, '.')) : void 0;
}

const posix = () => {
	const home = () =>
		normalizePath((typeof os.homedir === 'function' ? os.homedir() : void 0) || env.HOME);

	const temp = () => {
		const fallback = '/tmp';
		const priorityList = [
			typeof os.tmpdir === 'function' ? os.tmpdir() : void 0,
			env.TMPDIR,
			env.TEMP,
			env.TMP,
		];
		return normalizePath(priorityList.find((v) => !isEmpty(v))) || fallback;
	};

	return { home, temp };
};

const windows = () => {
	const home = () => {
		const priorityList = [
			typeof os.homedir === 'function' ? os.homedir() : void 0,
			env.USERPROFILE,
			env.HOME,
			env.HOMEDRIVE || env.HOMEPATH ? path.join(env.HOMEDRIVE || '', env.HOMEPATH || '') : void 0,
		];
		return normalizePath(priorityList.find((v) => !isEmpty(v)));
	};

	const temp = () => {
		const fallback = 'C:\\Temp';
		const priorityList = [
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
		return normalizePath(priorityList.find((v) => !isEmpty(v))) || fallback;
	};

	return { home, temp };
};

// eslint-disable-next-line functional/no-class
class _OSPaths {
	constructor() {
		const OSPaths = function () {
			return new _OSPaths();
		};

		// connect platform-specific API functions
		const extension = isWinOS ? windows() : posix();
		OSPaths.home = extension.home;
		OSPaths.temp = extension.temp;

		OSPaths.main = () => adapter.meta.mainFilename;

		return OSPaths;
	}
}

const default_ = new _OSPaths() as OSPaths;
export default default_;
