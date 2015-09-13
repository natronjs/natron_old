# [![natron][natron-img]][natron-url]
**A JavaScript Task Runner.**

[![npm][npm-img]][npm-url] [![gitter][gitter-img]][gitter-url]

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
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/natronjs/natron
