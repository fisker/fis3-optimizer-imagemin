# fis3-optimizer-imagemin-giflossy
> a image optimizer plugin of fis3 based on imagemin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-giflossy.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-giflossy)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-giflossy.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-giflossy)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-giflossy.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-giflossy)


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin

## install
```sh
$ npm i -g fis3-optimizer-imagemin-giflossy
```

## options

### default options

notice: *this might change in future*

```json
{
  "interlaced": true,
  "lossy": 80
}
```
more options:

https://www.npmjs.com/package/imagemin-giflossy


## usage

```js
// fis-conf.js

var options = {} // your options

fis.match('*.gif', {
  optimizer: fis.plugin('imagemin-giflossy', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

imagemin-giflossy: https://www.npmjs.com/package/imagemin-giflossy


## license
MIT © [fisker Cheung](https://github.com/fisker)
