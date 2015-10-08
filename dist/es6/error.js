/*
 * natron
 */

"use strict";

class NatronError extends Error {

  constructor(message) {
    super(message);
    this.message = message;
  }

  static create(message) {
    return new NatronError(message);
  }
}

export { NatronError };