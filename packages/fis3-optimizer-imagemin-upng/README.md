# fis3-optimizer-imagemin-upng
a image optimizer plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-upng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-upng)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-upng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-upng)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-upng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-upng)

## install
```sh
npm i -g fis3-optimizer-imagemin-upng
```

### default options
```
{
  "options": {
    "cnum": 256
  }
}
```
more options:

https://www.npmjs.com/package/imagemin-upng


notice: *default plugin and plugin config might change in future*

### usage

```
// fis-conf.js

var options = {} // your options

fis.match('*.png', {
  optimizer: fis.plugin('imagemin-upng', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

imagemin-upng: https://www.npmjs.com/package/imagemin-upng


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin