/*
 * natron
 */
import {execFile} from "child_process";

export function exec(cmd: string, args?: Array<string>, options?: object): Promise {
  if (!(args instanceof Array)) {
    if (typeof args === "object") {
      [args, options] = [[], args];
    } else {
      args = args ? [args] : [];
    }
  }
  let child, p = new Promise((resolve, reject) => {
    child = execFile(cmd, args, options, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({child, stdout, stderr});
      }
    });
  });
  p.child = child;
  p.promise = p;
  return p;
}
