import * as os from 'os';
import * as path from 'path';

var adapter = {
    env: {
        get: function (s) {
            return process.env[s];
        },
    },
    os: os,
    path: path,
    process: process,
};

export { adapter };
