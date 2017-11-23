module.exports = require('./processor.js')({
  '.gif': {
    gifsicle: {
      interlaced: true
    }
  },
  '.jpg': {
    mozjpeg: {}
  },
  '.png': {
    upng: {}
  },
  '.svg': {
    svgo: {
      plugins: [
        {
          removeViewBox: false
        }
      ]
    }
  },
  '.webp': {
    webp: {}
  }
})
