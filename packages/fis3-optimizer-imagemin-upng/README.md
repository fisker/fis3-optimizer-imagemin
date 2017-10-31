# fis3-optimizer-imagemin-upng
> a image optimizer plugin of fis3 based on imagemin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-upng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-upng)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-upng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-upng)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-upng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-upng)


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin

## install
```sh
$ npm i -g fis3-optimizer-imagemin-upng
```

## options

### default options

notice: *this might change in future*

```json
{}
```
more options:

https://www.npmjs.com/package/imagemin-upng


## usage

```js
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


## license
MIT © [fisker Cheung](https://github.com/fisker)
