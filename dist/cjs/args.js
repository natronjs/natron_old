/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _minimist = require("minimist");

var _minimist2 = _interopRequireDefault(_minimist);

exports["default"] = (0, _minimist2["default"])(process.argv.slice(2));
module.exports = exports["default"];