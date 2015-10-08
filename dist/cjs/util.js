/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

exports.parseArgs = parseArgs;
exports.unescapePointer = unescapePointer;
exports.hrtimeFormat = hrtimeFormat;
exports.loadTranspiler = loadTranspiler;

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

function unescapePointer(path) {
  return path.replace(/~1/g, "/").replace(/~0/g, "~");
}

var HRTIME_UNITS = ["ns", "μs", "ms", "s", "min", "h"];

function hrtimeFormat(_ref2) {
  var _ref22 = _slicedToArray(_ref2, 2);

  var s = _ref22[0];
  var ns = _ref22[1];

  var t = undefined,
      i = undefined,
      j = undefined;
  if (s > 0) {
    for (t = s, i = 3, j = ""; t > 60 && i < 5; i++) {
      j = " " + (t % 60 | 0) + " " + HRTIME_UNITS[i];
      t /= 60;
    }
    if (i > 3) {
      return (t | 0) + " " + HRTIME_UNITS[i] + j;
    }
    t += ns / 1e9;
  } else {
    for (t = ns, i = 0, j = ""; t > 1e3; i++) {
      t /= 1e3;
    }
  }
  var f = t.toFixed(i && t < 100 && (t < 10 ? 2 : 1));
  return f + " " + HRTIME_UNITS[i];
}

function loadTranspiler(transpiler) {
  switch (transpiler) {
    case "babel":
      {
        return require("babel-core/register");
      }
    case "type-script":
    case "typescript":
      {
        return require("ts-node/register");
      }
    case "coffee-script":
    case "coffeescript":
      {
        return require("coffee-script/register");
      }
    default:
      {
        if (String(transpiler).indexOf("/") !== -1) {
          return require(transpiler);
        }
        throw new Error("Unknown transpiler '" + transpiler + "'");
      }
  }
}