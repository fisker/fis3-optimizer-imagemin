'use strict'

var processor = require('./processor.js')

module.exports = processor('giflossy', {
  interlaced: true,
  lossy: 80
})
