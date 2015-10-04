/*
 * natron
 */
import minimist from "minimist";

export function parseArgs(args: Array<string>): object {
  let {_, ...taskFlags} = minimist(args);
  let [nfFile, taskName, ...taskArgs] = _;
  return {nfFile, taskName, taskArgs, taskFlags};
}
