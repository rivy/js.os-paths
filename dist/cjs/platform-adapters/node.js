"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
exports.__esModule = true;
exports.adapter = void 0;
var os = __importStar(require("os"));
var path = __importStar(require("path"));
exports.adapter = {
    env: {
        get: function (s) {
            return process.env[s];
        }
    },
    meta: {
        mainFilename: ((_a = process.mainModule) === null || _a === void 0 ? void 0 : _a.filename) || ''
    },
    os: os,
    path: path,
    process: process
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF0Zm9ybS1hZGFwdGVycy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlCO0FBQ3pCLHlDQUE2QjtBQUloQixRQUFBLE9BQU8sR0FBcUI7SUFDeEMsR0FBRyxFQUFFO1FBQ0osR0FBRyxFQUFFLFVBQUMsQ0FBQztZQUVOLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDO0tBQ0Q7SUFDRCxJQUFJLEVBQUU7UUFDTCxZQUFZLEVBQUUsT0FBQSxPQUFPLENBQUMsVUFBVSwwQ0FBRSxRQUFRLEtBQUksRUFBRTtLQUNoRDtJQUNELEVBQUUsSUFBQTtJQUNGLElBQUksTUFBQTtJQUNKLE9BQU8sU0FBQTtDQUNQLENBQUMifQ==