/*
 * natron
 */

const __RC__ = Symbol("__rc__");

export class NatronRC {

  constructor(rc?: object|string) {
    if (rc && typeof rc === "string") {
      try {
        rc = JSON.parse(rc);
      } catch (err) {
        throw new Error(`Unable to parse NATRON_RC from ${rc}`);
      }
    }
    Object.defineProperty(this, __RC__, {
      value: Object(rc),
    });
  }

  static load(rc?: object|string): NatronRC {
    return new NatronRC(rc);
  }

  get(path?: string, defaultValue?: any): any {
    let cur = this[__RC__];
    if (path && typeof path === "string") {
      for (let i = 0, p = path.split("."); cur && i < p.length; i++) {
        cur = cur[p[i]];
      }
    }
    return cur !== undefined ? cur : defaultValue;
  }
}

export var rc = NatronRC.load(process.env.NATRON_RC);
