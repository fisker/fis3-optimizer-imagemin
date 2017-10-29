module.exports = require('./processor.js')(
  {
    version: '^6.0.0',
    options: {
      quality: 90,
      progressive: true
    },
    ext: '.jpg',
    name: 'mozjpeg'
  },
  true
)
