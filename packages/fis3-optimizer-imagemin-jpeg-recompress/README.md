# fis3-optimizer-imagemin-jpeg-recompress
a image optimizer plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-jpeg-recompress.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-jpeg-recompress)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-jpeg-recompress.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-jpeg-recompress)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-jpeg-recompress.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-jpeg-recompress)

## install
```sh
$ npm i -g fis3-optimizer-imagemin-jpeg-recompress
```

## options

### default options
```json
{}
```
more options:

https://www.npmjs.com/package/imagemin-jpeg-recompress


notice: *default plugin and plugin config might change in future*

## usage

```js
// fis-conf.js

var options = {} // your options

fis.match('*.jpg', {
  optimizer: fis.plugin('imagemin-jpeg-recompress', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

imagemin-jpeg-recompress: https://www.npmjs.com/package/imagemin-jpeg-recompress


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin
