/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _path = require("path");

var _minimist = require("minimist");

var _minimist2 = _interopRequireDefault(_minimist);

var _natronCore = require("natron-core");

var _natronLogging = require("natron-logging");

function destructureArguments(args) {
  var _ref = args || {};

  var _ = _ref._;

  var taskFlags = _objectWithoutProperties(_ref, ["_"]);

  var _ref2 = _ || [];

  var _ref22 = _toArray(_ref2);

  var nfFile = _ref22[0];
  var taskName = _ref22[1];

  var taskArgs = _ref22.slice(2);

  return { nfFile: nfFile, taskName: taskName, taskArgs: taskArgs, taskFlags: taskFlags };
}

function getNatronRc() {
  try {
    return Object(JSON.parse(process.env.NATRON_RC));
  } catch (_) {}
}

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

function main() {
  var args = arguments.length <= 0 || arguments[0] === undefined ? defaultArgs : arguments[0];

  var _destructureArguments = destructureArguments(args);

  var nfFile = _destructureArguments.nfFile;
  var taskName = _destructureArguments.taskName;
  var taskArgs = _destructureArguments.taskArgs;
  var taskFlags = _destructureArguments.taskFlags;

  var rc = getNatronRc();
  (0, _natronLogging.wrapConsole)(_natronLogging.logger);
  try {
    if (!nfFile) {
      throw new Error("Natronfile not specified");
    }
    if (rc && rc.transpiler) {
      loadTranspiler(rc.transpiler);
    }
    nfFile = (0, _path.resolve)(nfFile);

    var nfModule = require(nfFile);

    if (nfModule && taskName) {
      var thing = undefined;
      if (nfModule[taskName]) {
        thing = nfModule[taskName];
      } else if (nfModule["default"]) {
        thing = nfModule["default"][taskName];
      }
      if (thing) {
        var _thing;

        if (!(thing instanceof _natronCore.Task)) {
          thing = (0, _natronCore.task)(thing);
        }
        (_thing = thing).run.apply(_thing, _toConsumableArray(taskArgs)).then(function () {
          _natronLogging.logger.info("Task '" + taskName + "' ... DONE");
        })["catch"](function (err) {
          _natronLogging.logger.error("Error:", err.message);
        });
      } else {
        throw new Error("Task '" + taskName + "' not found");
      }
    }
  } catch (err) {
    _natronLogging.logger.error("Error:", err.message);
  }
}

var defaultArgs = (0, _minimist2["default"])(process.argv.slice(2));
exports.defaultArgs = defaultArgs;