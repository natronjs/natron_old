/*
 * natron
 */

export class NatronError extends Error {

  constructor(message: string) {
    super(message);
    this.message = message;
  }

  static create(message: string): NatronError {
    return new NatronError(message);
  }
}
