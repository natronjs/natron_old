/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;
exports.main = main;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require("path");

var _natronCore = require("natron-core");

var _natronLogging = require("natron-logging");

var _natron = require("./natron");

var _util = require("./util");

var _error = require("./error");

function resolveTask(nfModule, taskName) {
  if (!nfModule) {
    throw _error.NatronError.create("No tasks found");
  }
  var thing = undefined;
  if (nfModule[taskName]) {
    thing = nfModule[taskName];
  } else if (nfModule["default"]) {
    thing = nfModule["default"][taskName];
  }
  if (thing) {
    if (!(thing instanceof _natronCore.Task)) {
      thing = (0, _natronCore.task)(thing);
    }
    return thing;
  } else {
    throw _error.NatronError.create("Task " + _natron.colors.primary(taskName) + " not found");
  }
}

function run(_ref) {
  var nfFile = _ref.nfFile;
  var taskName = _ref.taskName;
  var taskArgs = _ref.taskArgs;
  var taskFlags = _ref.taskFlags;

  try {
    (function () {
      if (_natron.rc.get("/logging/wrapConsole")) {
        (0, _natronLogging.wrapConsole)(_natron.logger);
      }
      if (!nfFile) {
        throw _error.NatronError.create("Missing Natronfile");
      }
      var transpiler = _natron.rc.get("/transpiler");
      if (transpiler) {
        _natron.logger.debug("Loading transpiler " + _natron.colors.magenta(transpiler));
        (0, _util.loadTranspiler)(transpiler);
      }
      var nfModule = require((0, _path.resolve)(nfFile));
      var thing = resolveTask(nfModule, taskName);

      _natron.logger.info("Starting " + _natron.colors.primary(taskName));
      var hrstart = process.hrtime();
      thing.run.apply(thing, _toConsumableArray(taskArgs)).then(function () {
        var hrend = process.hrtime(hrstart);
        _natron.logger.success("Finished " + _natron.colors.primary(taskName) + " " + _natron.colors.hint("(%s)"), (0, _util.hrtimeFormat)(hrend));
      })["catch"](function (err) {
        _natron.logger.error(err);
        _natron.logger.error("Finished " + _natron.colors.primary(taskName) + " with errors");
      });
    })();
  } catch (err) {
    _natron.logger.error(err && err.message || String(err));
  }
}

function main(args) {
  run((0, _util.parseArgs)(args || process.argv.slice(2)));
}