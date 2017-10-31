# fis3-optimizer-imagemin-zopfli
a image optimizer plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-zopfli.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-zopfli)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-zopfli.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-zopfli)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-zopfli.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-zopfli)


## packages
all in one
https://www.npmjs.com/package/fis3-optimizer-imagemin

standalone
https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin

## install
```sh
$ npm i -g fis3-optimizer-imagemin-zopfli
```

## options

### default options

notice: *this might change in future*

```json
{}
```
more options:

https://www.npmjs.com/package/imagemin-zopfli


## usage

```js
// fis-conf.js

var options = {} // your options

fis.match('*.png', {
  optimizer: fis.plugin('imagemin-zopfli', options)
})
```

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin

imagemin-zopfli: https://www.npmjs.com/package/imagemin-zopfli


## license
MIT © [fisker Cheung](https://github.com/fisker)
