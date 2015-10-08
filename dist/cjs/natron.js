/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _natronLogging = require("natron-logging");

var _rc = require("./rc");

var rc = _rc.RC.load(process.env.NATRON_RC);

exports.rc = rc;
var colors = _natronLogging.Colors.create({
  enabled: rc.get("/logging/colors"),
  alias: {
    debug: "blue",
    verbose: "blue",
    info: "none",
    success: "green",
    warn: "yellow",
    error: "red",
    primary: "cyan",
    hint: "gray"
  }
});

exports.colors = colors;
var logger = new _natronLogging.Logger({
  levels: {
    debug: 0,
    verbose: 1,
    info: 2,
    success: 3,
    warn: 4,
    error: 5
  },
  transports: [new _natronLogging.ConsoleTransport({
    level: rc.get("/logging/level", "info"),
    timestamp: rc.get("/logging/timestamp", null),
    colors: colors
  })]
});
exports.logger = logger;