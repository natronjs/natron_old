/*
 * natron
 */
"use strict";

export { run };
export { main };
import { resolve } from "path";
import { task, Task } from "natron-core";
import { wrapConsole } from "natron-logging";
import { rc, logger, colors } from "./natron";
import { parseArgs, loadTranspiler, hrtimeFormat } from "./util";
import { NatronError } from "./error";

function resolveTask(nfModule, taskName) {
  if (!nfModule) {
    throw NatronError.create(`No tasks found`);
  }
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
    return thing;
  } else {
    throw NatronError.create(`Task ${ colors.primary(taskName) } not found`);
  }
}

function run({ nfFile, taskName, taskArgs, taskFlags }) {
  try {
    if (rc.get("/logging/wrapConsole")) {
      wrapConsole(logger);
    }
    if (!nfFile) {
      throw NatronError.create("Missing Natronfile");
    }
    let transpiler = rc.get("/transpiler");
    if (transpiler) {
      logger.debug(`Loading transpiler ${ colors.magenta(transpiler) }`);
      loadTranspiler(transpiler);
    }
    let nfModule = require(resolve(nfFile));
    let thing = resolveTask(nfModule, taskName);

    logger.info(`Starting ${ colors.primary(taskName) }`);
    let hrstart = process.hrtime();
    thing.run(...taskArgs).then(() => {
      let hrend = process.hrtime(hrstart);
      logger.success(`Finished ${ colors.primary(taskName) } ${ colors.hint("(%s)") }`, hrtimeFormat(hrend));
    })["catch"](err => {
      logger.error(err);
      logger.error(`Finished ${ colors.primary(taskName) } with errors`);
    });
  } catch (err) {
    logger.error(err && err.message || String(err));
  }
}

function main(args) {
  run(parseArgs(args || process.argv.slice(2)));
}