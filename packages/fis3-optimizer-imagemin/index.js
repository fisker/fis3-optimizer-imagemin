module.exports = require('./processor.js')(
  {
    upng: {
      ext: '.png',
      name: 'upng',
      version: '^1.0.6',
      options: {
        cnum: 256
      }
    },
    mozjpeg: {
      ext: '.jpg',
      name: 'mozjpeg',
      version: '^6.0.0',
      options: {
        quality: 90,
        progressive: true
      }
    },
    gifsicle: {
      ext: '.gif',
      name: 'gifsicle',
      version: '^5.2.0',
      options: {
        optimizationLevel: 3
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
