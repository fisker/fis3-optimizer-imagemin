module.exports = require('./processor.js')({
  '.png': {
    upng: {}
  },
  '.jpg': {
    mozjpeg: {}
  },
  '.gif': {
    gifsicle: {
      interlaced: true
    }
  },
  '.webp': {
    webp: {}
  },
  '.svg': {
    svgo: {
      plugins: [
        {
          removeViewBox: false
        }
      ]
    }
  }
})
