# fis3-optimizer-imagemin-mozjpeg
a image optimizer plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-mozjpeg.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-mozjpeg)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-mozjpeg.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-mozjpeg)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-mozjpeg.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-mozjpeg)

## install
```sh
npm i -g fis3-optimizer-imagemin-mozjpeg
```

### default options
```
{
  "options": {
    "quality": 90,
    "progressive": true
  }
}
```
more options:

https://www.npmjs.com/package/imagemin-mozjpeg


notice: *default plugin and plugin config might change in future*

### usage

```
// fis-conf.js

var options = {} // your options

fis.match('*.jpg', {
  optimizer: fis.plugin('imagemin-mozjpeg', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

imagemin-mozjpeg: https://www.npmjs.com/package/imagemin-mozjpeg


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin