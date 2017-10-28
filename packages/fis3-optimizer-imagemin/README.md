# fis3-optimizer-imagemin
a image optimizer plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin)

## install
```sh
npm i -g fis3-optimizer-imagemin
```

### default options
```
{
  ".png": {
    "upng": {
      "cnum": 256
    }
  },
  ".jpg": {
    "mozjpeg": {
      "quality": 90,
      "progressive": true
    }
  },
  ".gif": {
    "gifsicle": {
      "optimizationLevel": 3
    }
  },
  ".webp": {
    "webp": {}
  },
  ".svg": {
    "svgo": {}
  }
}
```
more options:

https://www.npmjs.com/package/imagemin-upng

https://www.npmjs.com/package/imagemin-mozjpeg

https://www.npmjs.com/package/imagemin-gifsicle

https://www.npmjs.com/package/imagemin-webp

https://www.npmjs.com/package/imagemin-svgo


notice: *default plugin and plugin config might change in future*

### usage

```
// fis-conf.js

var options = {} // your options

fis.match('::image', {
  optimizer: fis.plugin('imagemin', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

## pre installed imagemin plugins

imagemin-upng: https://www.npmjs.com/package/imagemin-upng

imagemin-mozjpeg: https://www.npmjs.com/package/imagemin-mozjpeg

imagemin-gifsicle: https://www.npmjs.com/package/imagemin-gifsicle

imagemin-webp: https://www.npmjs.com/package/imagemin-webp

imagemin-svgo: https://www.npmjs.com/package/imagemin-svgo


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin