import * as os from 'os';
import * as path from 'path';

import { Platform } from './_base';

export const adapter: Platform.Adapter = {
	env: {
		get: (s) => {
			return process.env[s];
		},
	},
	meta: {
		mainFilename: process.mainModule?.filename || '',
	},
	os,
	path,
	process,
};
