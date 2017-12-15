# fis3-optimizer-imagemin
> a image optimizer plugin of fis3 based on imagemin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin)


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin

## install
```sh
$ npm i -g fis3-optimizer-imagemin
```

## options

```js
var config = {
  FILE_EXT: {
    PLUGIN_NAME: OPTIONS
  }
}
FILE_EXT = .png, .png8, .jpg, .jpeg, .gif, .svg ...
PLUGIN_NAME = a imagemin supported plugin without prefix `image-`
OPTIONS = options for current plugin
```

### default options

notice: *this might change in future*

```json
{
  ".gif": {
    "gifsicle": {
      "interlaced": true
    }
  },
  ".jpg": {
    "mozjpeg": {
    }
  },
  ".png": {
    "upng": {
    }
  },
  ".svg": {
    "svgo": {
      "plugins": [
        {
          "removeViewBox": false
        }
      ]
    }
  },
  ".webp": {
    "webp": {
    }
  }
}
```
more options:

https://www.npmjs.com/package/imagemin-upng

https://www.npmjs.com/package/imagemin-mozjpeg

https://www.npmjs.com/package/imagemin-gifsicle

https://www.npmjs.com/package/imagemin-webp

https://www.npmjs.com/package/imagemin-svgo


## usage

```js
// fis-conf.js

var options = {} // your options

fis.match('::image', {
  optimizer: fis.plugin('imagemin', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

## preinstalled imagemin plugins

imagemin-upng@^1.2.2: https://www.npmjs.com/package/imagemin-upng

imagemin-mozjpeg@^6.0.0: https://www.npmjs.com/package/imagemin-mozjpeg

imagemin-gifsicle@^5.2.0: https://www.npmjs.com/package/imagemin-gifsicle

imagemin-webp@^4.0.0: https://www.npmjs.com/package/imagemin-webp

imagemin-svgo@^6.0.0: https://www.npmjs.com/package/imagemin-svgo


## license
MIT © [fisker Cheung](https://github.com/fisker)
