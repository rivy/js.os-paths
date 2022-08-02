// # spell-checker:ignore AllUsersProfile HomeDrive HomePath LocalAppData UserProfile WinDir falsey

import { Platform } from '../platform-adapters/_base.js';

/** `OSPaths` (API) Determine common OS/platform paths (home, temp, ...) */
// eslint-disable-next-line functional/prefer-type-literal
interface OSPaths {
	/** Create an `OSPaths` object (a preceding `new` is optional). */
	(): OSPaths;
	/** Create an `OSPaths` object (`new` is optional). */
	// eslint-disable-next-line @typescript-eslint/no-misused-new
	new (): OSPaths;

	/* eslint-disable functional/no-method-signature */

	/** Returns the path string of the user's home directory (or `undefined` if the user's home directory is not resolvable). */
	home(): string | undefined;
	/** Returns the path string of the system's default directory for temporary files. */
	temp(): string;

	/* eslint-enable functional/no-method-signature */
}

function isEmpty(s: string | null | undefined): boolean {
	return !s; // reminder: JS "falsey" == [undefined, null, NaN, 0, '', false]
}

function Adapt(adapter_: Platform.Adapter): { readonly OSPaths: OSPaths } {
	const { env, os, path } = adapter_;

	const isWinOS = /^win/i.test(adapter_.process.platform);

	function normalizePath(path_: string | undefined): string | undefined {
		return path_ ? adapter_.path.normalize(adapter_.path.join(path_, '.')) : void 0;
	}

	function home() {
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

		return isWinOS ? windows() : posix();
	}

	function temp(options?: { readonly enableFallback?: boolean; readonly fallback?: string }) {
		const options_: NonNullable<typeof options> & { readonly enableFallback: boolean } = {
			enableFallback: true,
			...options,
		};

		function joinPathToBase(base: string | undefined, segments: readonly string[]) {
			return base ? path.join(base, ...segments) : void 0;
		}

		function posix() {
			const fallback = options_.fallback ?? '/tmp'; // or '/var/tmp'
			const priorityList = [
				typeof os.tmpdir === 'function' ? os.tmpdir() : void 0,
				env.get('TMPDIR'),
				env.get('TEMP'),
				env.get('TMP'),
			];
			return (
				normalizePath(priorityList.find((v) => !isEmpty(v))) ||
				(options_.enableFallback ? fallback : void 0)
			);
		}

		function windows() {
			const fallback = options_.fallback ?? 'C:\\Temp'; // or 'C:\\Windows\\Temp'
			const priorityListLazy = [
				typeof os.tmpdir === 'function' ? os.tmpdir : () => void 0,
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
			return (v && normalizePath(v())) || (options_.enableFallback ? fallback : void 0);
		}

		return isWinOS ? windows() : posix();
	}

	// eslint-disable-next-line functional/no-class
	class OSPaths_ {
		constructor() {
			function OSPaths(): OSPaths {
				return new OSPaths_() as OSPaths;
			}

			OSPaths.home = home;
			OSPaths.temp = temp;

			return OSPaths;
		}
	}

	return { OSPaths: new OSPaths_() as OSPaths };
}

export type { OSPaths };
export { Adapt };
