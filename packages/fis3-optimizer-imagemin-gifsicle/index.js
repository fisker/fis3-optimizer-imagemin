module.exports = require('./processor.js')(
  {
    version: '^5.2.0',
    options: {
      optimizationLevel: 3
    },
    ext: '.gif',
    name: 'gifsicle'
  },
  true
)
