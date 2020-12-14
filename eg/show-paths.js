// # spell-checker:ignore APPNAME
/* eslint-env es6, node */
'use strict';

// # const path = require('path');
const util = require('util');

const _ = require('lodash') || undefined;

const osPaths = require('..');

console.log('osPaths:', util.inspect(osPaths));

if (_) {
	_.each(osPaths, (value, key) => {
		console.log(key, '=', osPaths[key]());
	});
}

process.env.TMPDIR = process.env.TEMP = process.TMP = 'temp';
if (_) {
	_.each(osPaths, (value, key) => {
		console.log(key, '=', osPaths[key]());
	});
}
