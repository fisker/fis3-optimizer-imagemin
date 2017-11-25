var dependencies = ['imagemin', 'promise-synchronizer']

var plugins = {
  png: [
    {
      name: 'upng',
      options: {}
    },
    {
      name: 'pngquant',
      options: {}
    },
    {
      name: 'pngcrush',
      options: {}
    },
    {
      name: 'zopfli',
      options: {}
    },
    {
      name: 'optipng',
      options: {}
    },
    {
      name: 'pngout',
      options: {}
    }
  ],
  jpg: [
    {
      name: 'mozjpeg',
      options: {}
    },
    {
      name: 'jpegtran',
      options: {
        progressive: true
      }
    },
    {
      name: 'jpegoptim',
      options: {
        progressive: true
      }
    },
    {
      name: 'jpeg-recompress',
      options: {}
    },
    {
      name: 'guetzli',
      options: {}
    }
  ],
  gif: [
    {
      name: 'gifsicle',
      options: {
        interlaced: true
      }
    },
    {
      name: 'giflossy',
      options: {
        interlaced: true,
        lossy: 80
      }
    }
  ],
  webp: [
    {
      name: 'webp',
      options: {}
    }
  ],
  svg: [
    {
      name: 'svgo',
      options: {
        plugins: [
          {
            removeViewBox: false
          }
        ]
      }
    }
  ]
}

var files = ['package.json', 'README.md', 'index.js', 'LICENSE', 'processor.js']

module.exports = {
  dependencies: dependencies,
  plugins: plugins,
  files: files
}
