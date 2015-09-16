/*
 * natron
 */
import {resolve} from "path";
import minimist from "minimist";
import {task, Task} from "natron-core";
import {logger, wrapConsole} from "natron-logging";

function destructureArguments(args: object): object {
  let {_, ...taskFlags} = args || {};
  let [nfFile, taskName, ...taskArgs] = _ || [];
  return {nfFile, taskName, taskArgs, taskFlags};
}

function getNatronRc(): object {
  try {
    return Object(JSON.parse(process.env.NATRON_RC));
  } catch (_) {}
}

function loadTranspiler(transpiler: string): void {
  switch (transpiler) {
    case "es6":
    case "babel": {
      require("babel-core/register");
      return true;
    }
    case "coffee":
    case "coffeescript": {
      require("coffee-script/register");
      return true;
    }
    default: {
      throw new Error(`Unknown transpiler '${transpiler}'`);
    }
  }
}

export function main(args = defaultArgs): void {
  let {nfFile, taskName, taskArgs, taskFlags} = destructureArguments(args);
  let rc = getNatronRc();
  wrapConsole(logger);
  try {
    if (!nfFile) {
      throw new Error("Natronfile not specified");
    }
    if (rc && rc.transpiler) {
      loadTranspiler(rc.transpiler);
    }
    nfFile = resolve(nfFile);

    let nfModule = require(nfFile);

    if (nfModule && taskName) {
      let thing;
      if (nfModule[taskName]) {
        thing = nfModule[taskName];
      } else if (nfModule.default) {
        thing = nfModule.default[taskName];
      }
      if (thing) {
        if (!(thing instanceof Task)) {
          thing = task(thing);
        }
        thing.run(...taskArgs).then(() => {
          logger.info(`Task '${taskName}' ... DONE`);
        }).catch((err) => {
          logger.error("Error:", err.message);
        });
      } else {
        throw new Error(`Task '${taskName}' not found`);
      }
    }
  } catch (err) {
    logger.error("Error:", err.message);
  }
}

export var defaultArgs = minimist(process.argv.slice(2));
