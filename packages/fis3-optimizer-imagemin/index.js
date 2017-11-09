module.exports = require('./processor.js')({
  '.png': {
    upng: {}
  },
  '.jpg': {
    mozjpeg: {}
  },
  '.gif': {
    giflossy: {
      interlaced: true,
      lossy: 80
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
