# fis3-optimizer-imagemin-optipng
a image optimizer plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-optipng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-optipng)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-optipng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-optipng)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-optipng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-optipng)

## install
```sh
npm i -g fis3-optimizer-imagemin-optipng
```

## options

### default options
```json
{}
```
more options:

https://www.npmjs.com/package/imagemin-optipng


notice: *default plugin and plugin config might change in future*

## usage

```js
// fis-conf.js

var options = {} // your options

fis.match('*.png', {
  optimizer: fis.plugin('imagemin-optipng', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

imagemin-optipng: https://www.npmjs.com/package/imagemin-optipng


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin