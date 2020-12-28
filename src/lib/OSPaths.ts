// # spell-checker:ignore AllUsersProfile HomeDrive HomePath LocalAppData UserProfile WinDir

import * as os from 'os';
import * as path from 'path';

export type OSPaths = {
	new (): OSPaths;
	(): OSPaths;
	readonly home: () => string | undefined;
	readonly temp: () => string;
};

const isWinOS = /^win/i.test(process.platform);

function normalize_path(path_: string | undefined): string | undefined {
	return path_ ? path.normalize(path.join(path_, '.')) : undefined;
}

const base = () => {
	const { env } = process;

	const home = () =>
		normalize_path((typeof os.homedir === 'function' ? os.homedir() : undefined) || env.HOME);

	const temp = () =>
		normalize_path(
			(typeof os.tmpdir === 'function' ? os.tmpdir() : undefined) ||
				env.TMPDIR ||
				env.TEMP ||
				env.TMP
		) || '/tmp';

	return { home, temp };
};

const windows = () => {
	const { env } = process;

	const home = () =>
		normalize_path(
			(typeof os.homedir === 'function' ? os.homedir() : undefined) ||
				env.USERPROFILE ||
				env.HOME ||
				(env.HOMEDRIVE || env.HOMEPATH
					? path.join(env.HOMEDRIVE || '', env.HOMEPATH || '')
					: undefined)
		);

	const temp = () =>
		normalize_path(
			(typeof os.tmpdir === 'function' ? os.tmpdir() : '') ||
				env.TEMP ||
				env.TMP ||
				(env.LOCALAPPDATA ? path.join(env.LOCALAPPDATA, 'Temp') : '') ||
				(function (s) {
					return s ? path.join(s, 'AppData', 'Local', 'Temp') : '';
				})(home()) ||
				(env.ALLUSERSPROFILE ? path.join(env.ALLUSERSPROFILE, 'Temp') : '') ||
				path.join(
					env.SystemRoot || env.windir || (env.SystemDrive ? env.SystemDrive + '\\' : 'C:\\'),
					'Temp'
				)
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
