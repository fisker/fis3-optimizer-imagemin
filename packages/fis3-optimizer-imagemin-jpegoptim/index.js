'use strict'

var processor = require('./processor.js')

module.exports = processor('jpegoptim', {
  progressive: true
})
