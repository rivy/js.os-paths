"use strict";
exports.__esModule = true;
var OSPaths_1 = require("./lib/OSPaths");
var node_1 = require("./platform-adapters/node");
var default_ = OSPaths_1.Adapt(node_1.adapter).OSPaths;
exports["default"] = default_;
var haveModuleExports_ = typeof module === 'object' && module.exports;
if (haveModuleExports_) {
    module.exports = default_;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5Q0FBK0M7QUFDL0MsaURBQW1EO0FBRW5ELElBQU0sUUFBUSxHQUFZLGVBQUssQ0FBQyxjQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFHakQscUJBQWUsUUFBUSxDQUFDO0FBRXhCLElBQU0sa0JBQWtCLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFHeEUsSUFBSSxrQkFBa0IsRUFBRTtJQUt2QixNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztDQUMxQiJ9