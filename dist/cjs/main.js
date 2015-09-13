/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _path = require("path");

var _natronCore = require("natron-core");

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
    case "babel":
      {
        if (!global._babelPolyfill) {
          require("babel-core/register");
        }
        return true;
      }
    default:
      {
        throw new Error("Unknown transpiler '" + transpiler + "'");
      }
  }
}

function main(args) {
  var _destructureArguments = destructureArguments(args);

  var nfFile = _destructureArguments.nfFile;
  var taskName = _destructureArguments.taskName;
  var taskArgs = _destructureArguments.taskArgs;
  var taskFlags = _destructureArguments.taskFlags;

  var rc = getNatronRc();
  try {
    if (!nfFile) {
      throw new Error("Natronfile not specified");
    }
    nfFile = (0, _path.resolve)(nfFile);

    if (rc && rc.transpiler) {
      loadTranspiler(rc.transpiler);
    }

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
          console.log("Task '" + taskName + "' ... DONE");
        })["catch"](function (err) {
          console.error("Error:", err.message);
        });
      } else {
        throw new Error("Task '" + taskName + "' not found");
      }
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}