module.exports = require('./processor.js')(
  {
    version: '^5.2.0',
    options: {
      interlaced: true
    },
    ext: '.gif',
    name: 'gifsicle'
  },
  true
)
