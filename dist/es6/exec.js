/*
 * natron
 */
"use strict";

export { exec };
import { execFile } from "child_process";

function exec(cmd, args, options) {
  if (!(args instanceof Array)) {
    if (typeof args === "object") {
      [args, options] = [[], args];
    } else {
      args = args ? [args] : [];
    }
  }
  let child,
      p = new Promise((resolve, reject) => {
    child = execFile(cmd, args, options, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ child, stdout, stderr });
      }
    });
  });
  p.child = child;
  p.promise = p;
  return p;
}