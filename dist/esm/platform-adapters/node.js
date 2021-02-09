import * as os from 'os';
import * as path from 'path';
export var adapter = {
    env: {
        get: function (s) {
            return process.env[s];
        }
    },
    os: os,
    path: path,
    process: process
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF0Zm9ybS1hZGFwdGVycy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBSTdCLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBcUI7SUFDeEMsR0FBRyxFQUFFO1FBQ0osR0FBRyxFQUFFLFVBQUMsQ0FBQztZQUVOLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDO0tBQ0Q7SUFDRCxFQUFFLElBQUE7SUFDRixJQUFJLE1BQUE7SUFDSixPQUFPLFNBQUE7Q0FDUCxDQUFDIn0=