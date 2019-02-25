'use strict'

var processor = require('./processor.js')

module.exports = processor({
  '.gif': {
    gifsicle: {
      interlaced: true,
    },
  },
  '.jpg': {
    mozjpeg: {},
  },
  '.png': {
    upng: {},
  },
  '.svg': {
    svgo: {
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    },
  },
  '.webp': {
    webp: {},
  },
})
