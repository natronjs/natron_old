/*
 * natron
 */
import {resolve} from "path";
import {task, Task} from "natron-core";
import {wrapConsole} from "natron-logging";
import {parseArgs} from "./util";
import {rc} from "./rc";
import {logger, colors} from "./logging";

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

export function run({nfFile, taskName, taskArgs, taskFlags}) {
  try {
    if (rc.get("logging.wrapConsole")) {
      wrapConsole(logger);
    }
    if (!nfFile) {
      throw new Error("Missing Natronfile");
    }
    let transpiler = rc.get("transpiler");
    if (transpiler) {
      loadTranspiler(transpiler);
    }
    let nfModule = require(resolve(nfFile));

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
        logger.info(`Starting '${taskName}' ...`);
        let hrstart = process.hrtime();
        thing.run(...taskArgs).then(() => {
          let hrend = process.hrtime(hrstart);
          logger.success(`Finished '${taskName}' after %ds %dms`, hrend[0], hrend[1]/1e6);
        }).catch((err) => {
          logger.error(err);
          logger.error(`Finished '${taskName}' with errors after ...`);
        });
      } else {
        throw new Error(`Task '${taskName}' not found`);
      }
    }
  } catch (err) {
    logger.error(String(err));
  }
}

export function main(args?: Array<string>) {
  run(parseArgs(args || process.argv.slice(2)));
}
