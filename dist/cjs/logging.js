/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _natronLogging = require("natron-logging");

var _rc = require("./rc");

Object.defineProperty(exports, "colors", {
  enumerable: true,
  get: function get() {
    return _natronLogging.colors;
  }
});
var logger = new _natronLogging.Logger({
  transports: [new _natronLogging.ConsoleTransport({
    level: _rc.rc.get("logging.level", "debug"),
    timestamp: _rc.rc.get("logging.timestamp", null)
  })]
});
exports.logger = logger;