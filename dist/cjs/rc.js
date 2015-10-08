/*
 * natron
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _util = require("./util");

var __RC__ = Symbol("__rc__");

var RC = (function () {
  function RC(rc) {
    _classCallCheck(this, RC);

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

  _createClass(RC, [{
    key: "get",
    value: function get(path, defaultValue) {
      var cur = this[__RC__];
      if (path && typeof path === "string") {
        if (path.charAt(0) !== "/") {
          // @see https://tools.ietf.org/html/rfc6901
          throw new SyntaxError("Invalid JSON Pointer " + path);
        }
        var parts = (0, _util.unescapePointer)(path.substring(1)).split("/");
        for (var i = 0; cur && i < parts.length; i++) {
          cur = cur[parts[i]];
        }
      }
      return cur !== undefined ? cur : defaultValue;
    }
  }], [{
    key: "load",
    value: function load(rc) {
      return new RC(rc);
    }
  }]);

  return RC;
})();

exports.RC = RC;