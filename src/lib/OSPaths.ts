// # spell-checker:ignore HomeDrive HomePath LocalAppData UserProfile WinDir

import * as os from 'os';
import * as path from 'path';

export type OSPaths = {
	new (): OSPaths;
	(): OSPaths;
	readonly home: () => string;
	readonly temp: () => string;
};

const isWinOS = /^win/i.test(process.platform);

function normalize_path(path_: string): string {
	return path.normalize(path.join(path_, '.'));
}

const base = () => {
	const { env } = process;

	const home = () => normalize_path((os.homedir ? os.homedir() : env.HOME) ?? '');

	const temp = () =>
		normalize_path((os.tmpdir ? os.tmpdir() : env.TMPDIR || env.TEMP || env.TMP) ?? '');

	return { home, temp };
};

const windows = () => {
	const { env } = process;

	const home = () =>
		normalize_path(
			(typeof os.homedir === 'function'
				? os.homedir()
				: env.USERPROFILE || path.join(env.HOMEDRIVE ?? '', env.HOMEPATH ?? '') || env.HOME) ?? ''
		);

	const temp = () =>
		normalize_path(
			(typeof os.tmpdir === 'function'
				? os.tmpdir()
				: env.TEMP ||
				  env.TMP ||
				  path.join(env.LOCALAPPDATA || env.SystemRoot || env.windir || '', 'Temp')) ?? ''
		);

	return { home, temp };
};

// eslint-disable-next-line functional/no-class
class _OSPaths {
	constructor() {
		const OSPaths = function () {
			return new _OSPaths();
		};

		// Connect to platform-specific API functions by extension
		const extension = isWinOS ? windows() : base();
		OSPaths.home = extension.home;
		OSPaths.temp = extension.temp;

		return OSPaths;
	}
}

const default_ = new _OSPaths() as OSPaths;
export default default_;
