/*
 * natron
 */
"use strict";

export { main };
import { resolve } from "path";
import { task, Task } from "natron-core";

function destructureArguments(args) {
  let { _, ...taskFlags } = args || {};
  let [nfFile, taskName, ...taskArgs] = _ || [];
  return { nfFile, taskName, taskArgs, taskFlags };
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
        throw new Error(`Unknown transpiler '${ transpiler }'`);
      }
  }
}

function main(args) {
  let { nfFile, taskName, taskArgs, taskFlags } = destructureArguments(args);
  let rc = getNatronRc();
  try {
    if (!nfFile) {
      throw new Error("Natronfile not specified");
    }
    nfFile = resolve(nfFile);

    if (rc && rc.transpiler) {
      loadTranspiler(rc.transpiler);
    }

    let nfModule = require(nfFile);

    if (nfModule && taskName) {
      let thing;
      if (nfModule[taskName]) {
        thing = nfModule[taskName];
      } else if (nfModule["default"]) {
        thing = nfModule["default"][taskName];
      }
      if (thing) {
        if (!(thing instanceof Task)) {
          thing = task(thing);
        }
        thing.run(...taskArgs).then(() => {
          console.log(`Task '${ taskName }' ... DONE`);
        })["catch"](err => {
          console.error("Error:", err.message);
        });
      } else {
        throw new Error(`Task '${ taskName }' not found`);
      }
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}