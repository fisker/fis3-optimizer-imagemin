# fis3-optimizer-imagemin
a image minifier plugin of fis3 based on imagemin

[![npm](https://img.shields.io/npm/v/fis3-optimizer-imagemin.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin) 
[![npm](https://img.shields.io/npm/dt/fis3-optimizer-imagemin.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin) 
[![npm](https://img.shields.io/npm/dm/fis3-optimizer-imagemin.svg?style=flat-square)](https://www.npmjs.com/package/fis3-optimizer-imagemin)

## usage

    $ npm i -g fis3-optimizer-imagemin

```
// fis-conf.js

var imageminConf = {}; 

fis.match('*.{png,jpg,gif,svg}}', {
  optimizer: fis.plugin('imagemin', imageminConf)
});
```

### options

```
var imageminConf = {
  FILE_EXT: {
    PLUGIN_NAME: OPTIONS
  }
}; 
FILE_EXT = .png, .png8, .jpg, .jpeg, .gif, .svg ...;
PLUGIN_NAME = a imagemin support plgin without prefix `image-`
OPTIONS = options for current plugin

// example
var stylelintConf = {
  ".png": {
    upng: {
      cnum: 256
    }
  }
}; 
```
### default options
```
// default plugins
.png: imagemin-upng
.jpg: imagemin-mozjpeg
.webp: imagemin-webp
.svg: imagemin-svgo

// and also default config for these plugins
imagemin-upng: {
  cnum: 256
}
imagemin-jpegtran: {
  progressive: true,
}
imagemin-mozjpeg: {
  quality: 90,
  progressive: true,
}
imagemin-gifsicle: {
  optimizationLevel: 3,
}
imagemin-webp: {}
imagemin-svgo: {}
```

notice: default plugin and plugin config might change in future

### pre-installed plugins
```
"imagemin-pngquant": "^5.0.1",
"imagemin-pngcrush": "^5.1.0",
"imagemin-zopfli": "^5.1.0",
"imagemin-jpegtran": "^5.0.2",
"imagemin-gifsicle": "^5.2.0",
"imagemin-webp": "^4.0.0",
"imagemin-jpegoptim": "^5.1.0",
"imagemin-mozjpeg": "^6.0.0",
"imagemin-svgo": "^5.2.2",
"imagemin-optipng": "^5.2.1",
"imagemin-pngout": "^2.0.0",
"imagemin-upng": "^1.0.4"
```
more plugins: https://www.npmjs.com/browse/keyword/imageminplugin

## links
fis3: http://fis.baidu.com/

imagemin: https://github.com/imagemin/imagemin
