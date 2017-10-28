# fis3-optimizer-imagemin-jpegtran
a image optimizer plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-jpegtran.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-jpegtran)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-jpegtran.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-jpegtran)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-jpegtran.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-jpegtran)

## install
```sh
npm i -g fis3-optimizer-imagemin-jpegtran
```

## default options
```json
{
  "options": {
    "progressive": true
  }
}
```
more options:

https://www.npmjs.com/package/imagemin-jpegtran


notice: *default plugin and plugin config might change in future*

## usage

```js
// fis-conf.js

var options = {} // your options

fis.match('*.jpg', {
  optimizer: fis.plugin('imagemin-jpegtran', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

imagemin-jpegtran: https://www.npmjs.com/package/imagemin-jpegtran


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin