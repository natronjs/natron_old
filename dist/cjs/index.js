/*
 * natron
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _natronCore = require("natron-core");

var _core = _interopRequireWildcard(_natronCore);

exports.core = _core;
Object.defineProperty(exports, "task", {
  enumerable: true,
  get: function get() {
    return _natronCore.task;
  }
});

var _rc = require("./rc");

Object.defineProperty(exports, "rc", {
  enumerable: true,
  get: function get() {
    return _rc.rc;
  }
});

var _exec = require("./exec");

Object.defineProperty(exports, "exec", {
  enumerable: true,
  get: function get() {
    return _exec.exec;
  }
});

var _logging = require("./logging");

Object.defineProperty(exports, "logger", {
  enumerable: true,
  get: function get() {
    return _logging.logger;
  }
});
Object.defineProperty(exports, "colors", {
  enumerable: true,
  get: function get() {
    return _logging.colors;
  }
});