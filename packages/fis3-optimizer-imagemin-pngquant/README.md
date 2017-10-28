# fis3-optimizer-imagemin-pngquant
a image optimizer plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-pngquant.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-pngquant)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-pngquant.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-pngquant)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-pngquant.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-pngquant)

## install
```sh
npm i -g fis3-optimizer-imagemin-pngquant
```

### default options
```
{
  "options": {}
}
```
more options:

https://www.npmjs.com/package/imagemin-pngquant


notice: *default plugin and plugin config might change in future*

### usage

```
// fis-conf.js

var options = {} // your options

fis.match('*.png', {
  optimizer: fis.plugin('imagemin-pngquant', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

imagemin-pngquant: https://www.npmjs.com/package/imagemin-pngquant


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin