# [![natron][natron-img]][natron-url]
**A JavaScript Task Runner**

[![npm version][npm-img]][npm-url] [![npm dlm][dlm-img]][dlm-url] [![build status][travis-img]][travis-url] [![gitter chat][gitter-img]][gitter-url]

## Documentation
The `natron` command is part of the [`natron-cli`](https://npmjs.org/package/natron-cli) module.

## Example `natronfile.js`
### Hello World

```js
module.exports.greet = function (name) {
  console.log("Hello", name);
}
```

```sh
$ natron greet World
Hello World
```

[natron-img]: http://static.natronjs.com/img/natronjs.svg
[natron-url]: http://natronjs.com
[npm-img]: https://img.shields.io/npm/v/natron.svg
[npm-url]: https://npmjs.org/package/natron
[dlm-img]: https://img.shields.io/npm/dm/natron.svg
[dlm-url]: https://npmjs.org/package/natron
[travis-img]: https://travis-ci.org/natronjs/natron.svg
[travis-url]: https://travis-ci.org/natronjs/natron
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/natronjs/natron
