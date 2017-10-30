module.exports = require('./processor.js')(
  {
    version: '^5.1.0',
    options: {
      progressive: true
    },
    ext: '.jpg',
    name: 'jpegoptim'
  },
  true
)
