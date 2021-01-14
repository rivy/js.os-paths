// # spell-checker:ignore AllUsersProfile HomeDrive HomePath LocalAppData UserProfile WinDir falsey

import { Platform } from '../platform-adapters/_base';

export type OSPaths = {
	new (): OSPaths;
	(): OSPaths;
	readonly home: () => string | undefined;
	readonly temp: () => string;
};

function isEmpty(s: string | null | undefined): boolean {
	return !s; // reminder: JS "falsey" == [undefined, null, NaN, 0, '', false]
}

export function OSPathsAdaptionBuilder_(adapter_: Platform.Adapter): OSPaths {
	const { env, os, path, process } = adapter_;

	const isWinOS = /^win/i.test(process.platform);

	function normalizePath(path_: string | undefined): string | undefined {
		return path_ ? path.normalize(path.join(path_, '.')) : void 0;
	}

	const posix = () => {
		const home = () =>
			normalizePath((typeof os.homedir === 'function' ? os.homedir() : void 0) || env.get('HOME'));

		const temp = () => {
			const fallback = '/tmp';
			const priorityList = [
				typeof os.tmpdir === 'function' ? os.tmpdir() : void 0,
				env.get('TMPDIR'),
				env.get('TEMP'),
				env.get('TMP'),
			];
			return normalizePath(priorityList.find((v) => !isEmpty(v))) || fallback;
		};

		return { home, temp };
	};

	const windows = () => {
		const home = () => {
			const priorityList = [
				typeof os.homedir === 'function' ? os.homedir() : void 0,
				env.get('USERPROFILE'),
				env.get('HOME'),
				env.get('HOMEDRIVE') || env.get('HOMEPATH')
					? path.join(env.get('HOMEDRIVE') || '', env.get('HOMEPATH') || '')
					: void 0,
			];
			return normalizePath(priorityList.find((v) => !isEmpty(v)));
		};

		function joinPathToBase(base: string | undefined, segments: ReadonlyArray<string>) {
			return base ? path.join(base, ...segments) : void 0;
		}

		const temp = () => {
			const fallback = 'C:\\Temp';
			const priorityListLazy = [
				os.tmpdir,
				() => env.get('TEMP'),
				() => env.get('TMP'),
				() => joinPathToBase(env.get('LOCALAPPDATA'), ['Temp']),
				() => joinPathToBase(home(), ['AppData', 'Local', 'Temp']),
				() => joinPathToBase(env.get('ALLUSERSPROFILE'), ['Temp']),
				() => joinPathToBase(env.get('SystemRoot'), ['Temp']),
				() => joinPathToBase(env.get('windir'), ['Temp']),
				() => joinPathToBase(env.get('SystemDrive'), ['\\', 'Temp']),
			];
			const v = priorityListLazy.find((v) => v && !isEmpty(v()));
			return (v && normalizePath(v())) || fallback;
		};

		return { home, temp };
	};

	// eslint-disable-next-line functional/no-class
	class OSPaths_ {
		constructor() {
			const OSPaths = function () {
				return new OSPaths_() as OSPaths;
			};

			// Connect to platform-specific API functions by extension
			const platformOS = isWinOS ? windows() : posix();
			OSPaths.home = platformOS.home;
			OSPaths.temp = platformOS.temp;

			return OSPaths;
		}
	}

	return new OSPaths_() as OSPaths;
}
