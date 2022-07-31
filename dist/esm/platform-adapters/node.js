import * as os from 'os';
import * as path from 'path';
export var adapter = {
    atImportPermissions: { env: true },
    env: {
        get: function (s) {
            return process.env[s];
        }
    },
    os: os,
    path: path,
    process: process
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wbGF0Zm9ybS1hZGFwdGVycy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBSTdCLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBcUI7SUFDeEMsbUJBQW1CLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0lBQ2xDLEdBQUcsRUFBRTtRQUNKLEdBQUcsRUFBRSxVQUFDLENBQUM7WUFFTixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztLQUNEO0lBQ0QsRUFBRSxJQUFBO0lBQ0YsSUFBSSxNQUFBO0lBQ0osT0FBTyxTQUFBO0NBQ1AsQ0FBQyJ9