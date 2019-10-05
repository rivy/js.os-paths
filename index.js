/* eslint-env es6, node */
// # spell-checker:ignore UserProfile HomeDrive HomePath WinDir
'use strict';

const os = require('os');

const isWinOS = /^win/i.test(process.platform);

const base = () => {
	const {env} = process;

	const object = {};

	object.home = os.homedir ?
		() => {
			return os.homedir();
		} :
		() => {
			let path = env.HOME;
			if (path.length > 1 && path.endsWith('/')) {
				path = path.slice(0, -1);
			}

			return path;
		};

	object.temp = os.tmpdir ?
		() => {
			return os.tmpdir();
		} :
		() => {
			let path = env.TMPDIR ||
				env.TEMP ||
				env.TMP ||
				'/tmp';
			if (path.length > 1 && path.endsWith('/')) {
				path = path.slice(0, -1);
			}

			return path;
		};

	return object;
};

const windows = () => {
	const {env} = process;

	const object = {};

	object.home = os.homedir ?
		() => {
			return os.homedir();
		} :
		() => {
			let path = env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || env.HOME;
			if (path.length > 1 && ((path.endsWith('\\') && !path.endsWith(':\\')) || (path.endsWith('/') && !path.endsWith(':/')))) {
				path = path.slice(0, -1);
			}

			return path;
		};

	object.temp = os.tmpdir ?
		() => {
			return os.tmpdir();
		} :
		() => {
			let path = env.TEMP ||
				env.TMP ||
				(env.SystemRoot || env.windir) + '\\temp';
			if (path.length > 1 && ((path.endsWith('\\') && !path.endsWith(':\\')) || (path.endsWith('/') && !path.endsWith(':/')))) {
				path = path.slice(0, -1);
			}

			return path;
		};

	return object;
};

class _OSPaths {
	constructor() {
		const OSPaths = function () {
			return new _OSPaths();
		};

		this._fn = OSPaths;

		// Connect to platform-specific API functions by extension
		const extension = isWinOS ? windows() : base();
		Object.keys(extension).forEach(key => {
			this._fn[key] = extension[key];
		});

		return this._fn;
	}
}

module.exports = new _OSPaths();
