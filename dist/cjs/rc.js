/*
 * natron
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __RC__ = Symbol("__rc__");

var NatronRC = (function () {
  function NatronRC(rc) {
    _classCallCheck(this, NatronRC);

    if (rc && typeof rc === "string") {
      try {
        rc = JSON.parse(rc);
      } catch (err) {
        throw new Error("Unable to parse NATRON_RC from " + rc);
      }
    }
    Object.defineProperty(this, __RC__, {
      value: Object(rc)
    });
  }

  _createClass(NatronRC, [{
    key: "get",
    value: function get(path, defaultValue) {
      var cur = this[__RC__];
      if (path && typeof path === "string") {
        for (var i = 0, p = path.split("."); cur && i < p.length; i++) {
          cur = cur[p[i]];
        }
      }
      return cur !== undefined ? cur : defaultValue;
    }
  }], [{
    key: "load",
    value: function load(rc) {
      return new NatronRC(rc);
    }
  }]);

  return NatronRC;
})();

exports.NatronRC = NatronRC;
var rc = NatronRC.load(process.env.NATRON_RC);
exports.rc = rc;