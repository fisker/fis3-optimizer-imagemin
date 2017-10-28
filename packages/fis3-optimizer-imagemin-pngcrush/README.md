# fis3-optimizer-imagemin-pngcrush
a image optimizer plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-pngcrush.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-pngcrush)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-pngcrush.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-pngcrush)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-pngcrush.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-pngcrush)

## install
```sh
npm i -g fis3-optimizer-imagemin-pngcrush
```

## default options
```json
{
  "options": {}
}
```
more options:

https://www.npmjs.com/package/imagemin-pngcrush


notice: *default plugin and plugin config might change in future*

## usage

```js
// fis-conf.js

var options = {} // your options

fis.match('*.png', {
  optimizer: fis.plugin('imagemin-pngcrush', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

imagemin-pngcrush: https://www.npmjs.com/package/imagemin-pngcrush


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin