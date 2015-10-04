/*
 * natron
 */
"use strict";

import { Logger, ConsoleTransport } from "natron-logging";
import { rc } from "./rc";

export { colors } from "natron-logging";

var logger = new Logger({
  transports: [new ConsoleTransport({
    level: rc.get("logging.level", "debug"),
    timestamp: rc.get("logging.timestamp", null)
  })]
});
export { logger };