/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exec = exec;

var _child_process = require("child_process");

function exec(cmd, args, options) {
  if (!(args instanceof Array)) {
    if (typeof args === "object") {
      var _ref = [[], args];
      args = _ref[0];
      options = _ref[1];
    } else {
      args = args ? [args] : [];
    }
  }
  var child = undefined,
      p = new Promise(function (resolve, reject) {
    child = (0, _child_process.execFile)(cmd, args, options, function (err, stdout, stderr) {
      if (err) {
        reject(err);
      } else {
        resolve({ child: child, stdout: stdout, stderr: stderr });
      }
    });
  });
  p.child = child;
  p.promise = p;
  return p;
}