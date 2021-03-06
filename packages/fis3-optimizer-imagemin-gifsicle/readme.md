# fis3-optimizer-imagemin-gifsicle

> a image optimizer plugin of fis3 based on imagemin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-gifsicle.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-gifsicle)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-gifsicle.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-gifsicle)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-gifsicle.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-gifsicle)

## packages

### all in one

[https://www.npmjs.com/package/fis3-optimizer-imagemin](https://www.npmjs.com/package/fis3-optimizer-imagemin)

### standalone

[https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin](https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin)

## install

```sh
npm i -g fis3-optimizer-imagemin-gifsicle
```

## options

### default options

notice: **this might change in future**

```json
{
  "interlaced": true
}
```

more options:

- [https://www.npmjs.com/package/imagemin-gifsicle](https://www.npmjs.com/package/imagemin-gifsicle)

## usage

```js
// fis-conf.js

const options = {} // your options

fis.match('*.gif', {
  optimizer: fis.plugin('imagemin-gifsicle', options),
})
```

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)
- imagemin: [https://github.com/imagemin/imagemin](https://github.com/imagemin/imagemin)
- imagemin-gifsicle: [https://www.npmjs.com/package/imagemin-gifsicle](https://www.npmjs.com/package/imagemin-gifsicle)

## license

MIT © [fisker Cheung](https://www.fiskercheung.com/)
