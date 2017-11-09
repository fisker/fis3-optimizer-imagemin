var dependencies = {
  imagemin: '^5.3.1',
  'object.assign': '^4.0.4',
  'promise-synchronizer': '^1.0.5'
}

var plugins = {
  png: [
    {
      name: 'upng',
      version: '^1.2.1',
      options: {}
    },
    {
      name: 'pngquant',
      version: '^5.0.1',
      options: {}
    },
    {
      name: 'pngcrush',
      version: '^5.1.0',
      options: {}
    },
    {
      name: 'zopfli',
      version: '^5.1.0',
      options: {}
    },
    {
      name: 'optipng',
      version: '^5.2.1',
      options: {}
    },
    {
      name: 'pngout',
      version: '^2.0.0',
      options: {}
    }
  ],
  jpg: [
    {
      name: 'mozjpeg',
      version: '^6.0.0',
      options: {}
    },
    {
      name: 'jpegtran',
      version: '^5.0.2',
      options: {
        progressive: true
      }
    },
    {
      name: 'jpegoptim',
      version: '^5.1.0',
      options: {
        progressive: true
      }
    },
    {
      name: 'jpeg-recompress',
      version: '^5.1.0',
      options: {}
    },
    {
      name: 'guetzli',
      version: '^1.0.0',
      options: {}
    }
  ],
  gif: [
    {
      name: 'giflossy',
      version: '^5.1.10',
      options: {
        interlaced: true,
        lossy: 80
      }
    },
    {
      name: 'gifsicle',
      version: '^5.2.0',
      options: {
        interlaced: true
      }
    }
  ],
  webp: [
    {
      name: 'webp',
      version: '^4.0.0',
      options: {}
    }
  ],
  svg: [
    {
      name: 'svgo',
      version: '^6.0.0',
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
