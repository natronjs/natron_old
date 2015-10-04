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

var _util = require("./util");

var _rc = require("./rc");

var _logging = require("./logging");

function loadTranspiler(transpiler) {
  switch (transpiler) {
    case "es6":
    case "babel":
      {
        require("babel-core/register");
        return true;
      }
    case "coffee":
    case "coffeescript":
      {
        require("coffee-script/register");
        return true;
      }
    default:
      {
        throw new Error("Unknown transpiler '" + transpiler + "'");
      }
  }
}

function run(_ref) {
  var nfFile = _ref.nfFile;
  var taskName = _ref.taskName;
  var taskArgs = _ref.taskArgs;
  var taskFlags = _ref.taskFlags;

  try {
    if (_rc.rc.get("logging.wrapConsole")) {
      (0, _natronLogging.wrapConsole)(_logging.logger);
    }
    if (!nfFile) {
      throw new Error("Missing Natronfile");
    }
    var transpiler = _rc.rc.get("transpiler");
    if (transpiler) {
      loadTranspiler(transpiler);
    }
    var nfModule = require((0, _path.resolve)(nfFile));

    if (nfModule && taskName) {
      var thing = undefined;
      if (nfModule[taskName]) {
        thing = nfModule[taskName];
      } else if (nfModule["default"]) {
        thing = nfModule["default"][taskName];
      }
      if (thing) {
        (function () {
          var _thing;

          if (!(thing instanceof _natronCore.Task)) {
            thing = (0, _natronCore.task)(thing);
          }
          _logging.logger.info("Starting '" + taskName + "' ...");
          var hrstart = process.hrtime();
          (_thing = thing).run.apply(_thing, _toConsumableArray(taskArgs)).then(function () {
            var hrend = process.hrtime(hrstart);
            _logging.logger.success("Finished '" + taskName + "' after %ds %dms", hrend[0], hrend[1] / 1e6);
          })["catch"](function (err) {
            _logging.logger.error(err);
            _logging.logger.error("Finished '" + taskName + "' with errors after ...");
          });
        })();
      } else {
        throw new Error("Task '" + taskName + "' not found");
      }
    }
  } catch (err) {
    _logging.logger.error(String(err));
  }
}

function main(args) {
  run((0, _util.parseArgs)(args || process.argv.slice(2)));
}