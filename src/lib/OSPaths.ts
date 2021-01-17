// # spell-checker:ignore AllUsersProfile HomeDrive HomePath LocalAppData UserProfile WinDir falsey

import { Platform } from '../platform-adapters/_base';

/** Generate portable common OS paths (home, temp, ...) */
export type OSPaths = {
	/** Create an OSPaths object. */
	(): OSPaths;
	/** Create an OSPaths object. */
	new (): OSPaths;
	/* eslint-disable functional/no-method-signature */
	/** Returns the home directory for user. */
	home(): string | undefined;
	/** Returns the directory for temporary files. */
	temp(): string;
	/* eslint-enable functional/no-method-signature */
};

function isEmpty(s: string | null | undefined): boolean {
	return !s; // reminder: JS "falsey" == [undefined, null, NaN, 0, '', false]
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Adapt {
	export const isWinOS = (adapter_: Platform.Adapter) => /^win/i.test(adapter_.process.platform);

	export const normalizePath = (adapter_: Platform.Adapter) => {
		return (path_: string | undefined): string | undefined => {
			return path_ ? adapter_.path.normalize(adapter_.path.join(path_, '.')) : void 0;
		};
	};

	export const home = (adapter_: Platform.Adapter) => {
		const { env, os, path } = adapter_;

		const isWinOS = Adapt.isWinOS(adapter_);
		const normalizePath = Adapt.normalizePath(adapter_);

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

	export const temp = (adapter_: Platform.Adapter) => {
		const { env, os, path } = adapter_;

		const isWinOS = Adapt.isWinOS(adapter_);
		const normalizePath = Adapt.normalizePath(adapter_);

		function joinPathToBase(base: string | undefined, segments: readonly string[]) {
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
				() => joinPathToBase(Adapt.home(adapter_)(), ['AppData', 'Local', 'Temp']),
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
}

export function OSPathsAdaptionBuilder_(adapter_: Platform.Adapter): OSPaths {
	function OSPaths(): OSPaths {
		return obj as OSPaths;
	}
	const home = Adapt.home(adapter_);
	const temp = Adapt.temp(adapter_);

	// retouch method names
	Object.defineProperty(home, 'name', { value: 'home' });
	Object.defineProperty(temp, 'name', { value: 'temp' });

	const obj = Object.assign(OSPaths, {
		home,
		temp,
	}) as OSPaths;
	return obj as OSPaths;
}
