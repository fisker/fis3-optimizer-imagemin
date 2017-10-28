var plugins = {}

plugins.png = {
  upng: {
    default: true,
    version: '^1.0.6',
    options: {
      cnum: 256
    },
  },
  pngquant: {
    version: '^5.0.1',
    options: {},
  },
  pngcrush: {
    version: '^5.1.0',
    options: {},
  },
  zopfli: {
    version: '^5.1.0',
    options: {},
  },
  optipng: {
    version: '^5.2.1',
    options: {},
  },
  pngout: {
    version: '^2.0.0',
    options: {},
  },
}

plugins.jpg = {
  mozjpeg: {
    default: true,
    version: '^6.0.0',
    options: {
      quality: 90,
      progressive: true,
    },
  },
  jpegtran: {
    version: '^5.0.2',
    options: {
      progressive: true,
    },
  },
  jpegoptim: {
    version: '^5.1.0',
    options: {},
  },
}

plugins.gif = {
  gifsicle: {
    default: true,
    version: '^5.2.0',
    options: {
      optimizationLevel: 3,
    },
  },
}

plugins.webp = {
  webp: {
    default: true,
    version: '^4.0.0',
    options: {},
  },
}

plugins.svg = {
  svgo: {
    default: true,
    version: '^5.2.2',
    options: {},
  },
}

module.exports = plugins
