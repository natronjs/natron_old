/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseArgs = parseArgs;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _minimist2 = require("minimist");

var _minimist3 = _interopRequireDefault(_minimist2);

function parseArgs(args) {
  var _minimist = (0, _minimist3["default"])(args);

  var _ = _minimist._;

  var taskFlags = _objectWithoutProperties(_minimist, ["_"]);

  var _ref = _toArray(_);

  var nfFile = _ref[0];
  var taskName = _ref[1];

  var taskArgs = _ref.slice(2);

  return { nfFile: nfFile, taskName: taskName, taskArgs: taskArgs, taskFlags: taskFlags };
}