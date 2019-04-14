# fis3-optimizer-imagemin-optipng

> a image optimizer plugin of fis3 based on imagemin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin-optipng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-optipng)
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin-optipng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-optipng)
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin-optipng.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin-optipng)

## packages

### all in one

[https://www.npmjs.com/package/fis3-optimizer-imagemin](https://www.npmjs.com/package/fis3-optimizer-imagemin)

### standalone

[https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin](https://www.npmjs.com/browse/keyword/fis3-optimizer-imagemin)

## install

```sh
npm i -g fis3-optimizer-imagemin-optipng
```

## options

### default options

notice: **this might change in future**

```json
{}
```

more options:

- [https://www.npmjs.com/package/imagemin-optipng](https://www.npmjs.com/package/imagemin-optipng)

## usage

```js
// fis-conf.js

const options = {} // your options

fis.match('*.png', {
  optimizer: fis.plugin('imagemin-optipng', options),
})
```

## links

- fis3: [http://fis.baidu.com/](http://fis.baidu.com/)
- imagemin: [https://github.com/imagemin/imagemin](https://github.com/imagemin/imagemin)
- imagemin-optipng: [https://www.npmjs.com/package/imagemin-optipng](https://www.npmjs.com/package/imagemin-optipng)

## license

MIT © [fisker Cheung](https://www.fiskercheung.com/)
