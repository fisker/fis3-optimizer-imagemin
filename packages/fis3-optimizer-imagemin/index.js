'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _processor = require('./processor.js')

var _processor2 = _interopRequireDefault(_processor)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

exports.default = (0, _processor2.default)({
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
module.exports = exports['default']
