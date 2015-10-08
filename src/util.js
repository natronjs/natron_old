/*
 * natron
 */
import minimist from "minimist";

export function parseArgs(args: Array<string>): object {
  let {_, ...taskFlags} = minimist(args);
  let [nfFile, taskName, ...taskArgs] = _;
  return {nfFile, taskName, taskArgs, taskFlags};
}

export function unescapePointer(path: string): string {
  return path.replace(/~1/g, "/").replace(/~0/g, "~");
}

const HRTIME_UNITS = ["ns", "μs", "ms", "s", "min", "h"];

export function hrtimeFormat([s, ns]): string {
  let t, i, j;
  if (s > 0) {
    for (t = s, i = 3, j = ""; t > 60 && i < 5; i++) {
      j = " " + ((t % 60)|0) + " " + HRTIME_UNITS[i];
      t /= 60;
    }
    if (i > 3) {
      return (t|0) + " " + HRTIME_UNITS[i] + j;
    }
    t += ns / 1e9;
  } else {
    for (t = ns, i = 0, j = ""; t > 1e3; i++) {
      t /= 1e3;
    }
  }
  let f =  t.toFixed(i && t < 100 && (t < 10 ? 2 : 1));
  return f + " " + HRTIME_UNITS[i];
}

export function loadTranspiler(transpiler: string) {
  switch (transpiler) {
    case "babel": {
      return require("babel-core/register");
    }
    case "type-script":
    case "typescript": {
      return require("ts-node/register");
    }
    case "coffee-script":
    case "coffeescript": {
      return require("coffee-script/register");
    }
    default: {
      if (String(transpiler).indexOf("/") !== -1) {
        return require(transpiler);
      }
      throw new Error(`Unknown transpiler '${transpiler}'`);
    }
  }
}
