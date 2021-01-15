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

const AdaptingIsWinOS = (adapter_: Platform.Adapter) => /^win/i.test(adapter_.process.platform);

const AdaptingNormalizePath = (adapter_: Platform.Adapter) => {
	return (path_: string | undefined): string | undefined => {
		return path_ ? adapter_.path.normalize(adapter_.path.join(path_, '.')) : void 0;
	};
};

const AdaptingHome = (adapter_: Platform.Adapter) => {
	const { env, os, path } = adapter_;
	const isWinOS = AdaptingIsWinOS(adapter_);
	const normalizePath = AdaptingNormalizePath(adapter_);

	const posix = () =>
		normalizePath((typeof os.homedir === 'function' ? os.homedir() : void 0) || env.get('HOME'));

	const windows = () => {
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

	return isWinOS ? windows : posix;
};

const AdaptingTemp = (adapter_: Platform.Adapter) => {
	const { env, os, path } = adapter_;
	const isWinOS = AdaptingIsWinOS(adapter_);
	const normalizePath = AdaptingNormalizePath(adapter_);
	function joinPathToBase(base: string | undefined, segments: ReadonlyArray<string>) {
		return base ? path.join(base, ...segments) : void 0;
	}

	const posix = () => {
		const fallback = '/tmp';
		const priorityList = [
			typeof os.tmpdir === 'function' ? os.tmpdir() : void 0,
			env.get('TMPDIR'),
			env.get('TEMP'),
			env.get('TMP'),
		];
		return normalizePath(priorityList.find((v) => !isEmpty(v))) || fallback;
	};

	const windows = () => {
		const fallback = 'C:\\Temp';
		const priorityListLazy = [
			os.tmpdir,
			() => env.get('TEMP'),
			() => env.get('TMP'),
			() => joinPathToBase(env.get('LOCALAPPDATA'), ['Temp']),
			() => joinPathToBase(AdaptingHome(adapter_)(), ['AppData', 'Local', 'Temp']),
			() => joinPathToBase(env.get('ALLUSERSPROFILE'), ['Temp']),
			() => joinPathToBase(env.get('SystemRoot'), ['Temp']),
			() => joinPathToBase(env.get('windir'), ['Temp']),
			() => joinPathToBase(env.get('SystemDrive'), ['\\', 'Temp']),
		];
		const v = priorityListLazy.find((v) => v && !isEmpty(v()));
		return (v && normalizePath(v())) || fallback;
	};

	return isWinOS ? windows : posix;
};

export function OSPathsAdaptionBuilder_(adapter_: Platform.Adapter): OSPaths {
	// eslint-disable-next-line functional/no-class
	class OSPaths_ {
		constructor() {
			const OSPaths = function () {
				return new OSPaths_() as OSPaths;
			};

			OSPaths.home = AdaptingHome(adapter_);
			OSPaths.temp = AdaptingTemp(adapter_);

			return OSPaths;
		}
	}

	return new OSPaths_() as OSPaths;
}
