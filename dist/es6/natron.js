/*
 * natron
 */
"use strict";

import { Logger, ConsoleTransport, Colors } from "natron-logging";
import { RC } from "./rc";

var rc = RC.load(process.env.NATRON_RC);

export { rc };
var colors = Colors.create({
  enabled: rc.get("/logging/colors"),
  alias: {
    debug: "blue",
    verbose: "blue",
    info: "none",
    success: "green",
    warn: "yellow",
    error: "red",
    primary: "cyan",
    hint: "gray"
  }
});

export { colors };
var logger = new Logger({
  levels: {
    debug: 0,
    verbose: 1,
    info: 2,
    success: 3,
    warn: 4,
    error: 5
  },
  transports: [new ConsoleTransport({
    level: rc.get("/logging/level", "info"),
    timestamp: rc.get("/logging/timestamp", null),
    colors: colors
  })]
});
export { logger };