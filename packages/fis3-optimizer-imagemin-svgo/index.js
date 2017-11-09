module.exports = require('./processor.js')(
  'svgo',

  {
    plugins: [
      {
        removeViewBox: false
      }
    ]
  }
)
