# [![Natron][natron-img]][natron-url]

[natron-img]: http://static.natronjs.com/img/natronjs.svg
[natron-url]: http://natronjs.com/

**A JavaScript Task Runner**

[![Version][npm-img]][npm-url]
[![Downloads][dlm-img]][npm-url]
[![Build Status][travis-img]][travis-url]

[![Gitter Chat][gitter-img]][gitter-url]

[npm-img]: https://img.shields.io/npm/v/natron.svg
[npm-url]: https://npmjs.org/package/natron
[dlm-img]: https://img.shields.io/npm/dm/natron.svg
[travis-img]: https://travis-ci.org/natronjs/natron.svg
[travis-url]: https://travis-ci.org/natronjs/natron
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/natronjs/natron

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
```
