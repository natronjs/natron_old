# Getting Started
## Install Natron

```sh
# Install Natron CLI globally
$ npm install -g natron-cli

# Install Natron in your `devDependencies`
$ npm install natron --save-dev
```

## Create a `natronfile.js`

```js
module.exports = {
  default: function () {
    console.log("Place code for your default task here");
  }
};
```

## Run Natron

```sh
$ natron default
Place code for your default task here
```
