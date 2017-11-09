# fis3-optimizer-imagemin-pngquant
> a image optimizer plugin of fis3 based on imagemin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-pngquant.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-pngquant)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-pngquant.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-pngquant)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-pngquant.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-pngquant)


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin

## install
```sh
$ npm i -g fis3-optimizer-imagemin-pngquant
```

## options

### default options

notice: *this might change in future*

```json
{}
```
more options:

https://www.npmjs.com/package/imagemin-pngquant


## usage

```js
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


## license
MIT © [fisker Cheung](https://github.com/fisker)
