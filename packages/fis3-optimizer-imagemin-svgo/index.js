'use strict'

var processor = require('./processor.js')

module.exports = processor('svgo', {
  plugins: [
    {
      removeViewBox: false
    }
  ]
})
