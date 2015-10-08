/*
 * natron
 */
"use strict";

import { unescapePointer } from "./util";

const __RC__ = Symbol("__rc__");

class RC {

  constructor(rc) {
    if (rc && typeof rc === "string") {
      try {
        rc = JSON.parse(rc);
      } catch (err) {
        throw new Error(`Unable to parse NATRON_RC from ${ rc }`);
      }
    }
    Object.defineProperty(this, __RC__, {
      value: Object(rc)
    });
  }

  static load(rc) {
    return new RC(rc);
  }

  get(path, defaultValue) {
    let cur = this[__RC__];
    if (path && typeof path === "string") {
      if (path.charAt(0) !== "/") {
        // @see https://tools.ietf.org/html/rfc6901
        throw new SyntaxError(`Invalid JSON Pointer ${ path }`);
      }
      let parts = unescapePointer(path.substring(1)).split("/");
      for (let i = 0; cur && i < parts.length; i++) {
        cur = cur[parts[i]];
      }
    }
    return cur !== undefined ? cur : defaultValue;
  }
}

export { RC };