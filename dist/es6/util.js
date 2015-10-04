/*
 * natron
 */
"use strict";

export { parseArgs };
import minimist from "minimist";

function parseArgs(args) {
  let { _, ...taskFlags } = minimist(args);
  let [nfFile, taskName, ...taskArgs] = _;
  return { nfFile, taskName, taskArgs, taskFlags };
}