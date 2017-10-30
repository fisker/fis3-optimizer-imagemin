module.exports = require('./processor.js')(
  {
    upng: {
      ext: '.png',
      name: 'upng',
      version: '^1.0.6',
      options: {}
    },
    mozjpeg: {
      ext: '.jpg',
      name: 'mozjpeg',
      version: '^6.0.0',
      options: {}
    },
    gifsicle: {
      ext: '.gif',
      name: 'gifsicle',
      version: '^5.2.0',
      options: {
        interlaced: true
      }
    },
    webp: {
      ext: '.webp',
      name: 'webp',
      version: '^4.0.0',
      options: {}
    },
    svgo: {
      ext: '.svg',
      name: 'svgo',
      version: '^5.2.2',
      options: {}
    }
  },
  false
)
