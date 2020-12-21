/* eslint-env es6, node */
// # spell-checker:ignore HomeDrive HomePath LocalAppData UserProfile WinDir
'use strict';

import * as os from 'os';
import * as paths from 'path';

export type OSPaths = {
	new (): OSPaths;
	(): OSPaths;
	readonly home: () => string;
	readonly temp: () => string;
};

const isWinOS = /^win/i.test(process.platform);

function normalize_path(path: string): string {
	return paths.normalize(paths.join(path, '.'));
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
			(os.homedir
				? os.homedir()
				: env.USERPROFILE || paths.join(env.HOMEDRIVE ?? '', env.HOMEPATH ?? '') || env.HOME) ?? ''
		);

	const temp = () =>
		normalize_path(
			(os.tmpdir
				? os.tmpdir()
				: env.TEMP ||
				  env.TMP ||
				  paths.join(env.LOCALAPPDATA || env.SystemRoot || env.windir || '', 'Temp')) ?? ''
		);

	return { home, temp };
};

// eslint-disable-next-line functional/no-class
class _OSPaths {
	readonly fn: OSPaths;
	constructor() {
		const OSPaths = function () {
			return new _OSPaths().fn;
		};

		// Connect to platform-specific API functions by extension
		const extension = isWinOS ? windows() : base();
		OSPaths.home = extension.home;
		OSPaths.temp = extension.temp;

		this.fn = OSPaths as OSPaths; // eslint-disable-line functional/no-this-expression
	}
}

const default_ = new _OSPaths().fn;
export default default_;
if (module) {
	// eslint-disable-next-line functional/immutable-data
	module.exports = default_;
}
