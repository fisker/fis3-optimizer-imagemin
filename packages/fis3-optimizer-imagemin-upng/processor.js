'use strict'

var _promiseSynchronizer = _interopRequireDefault(
  require('promise-synchronizer')
)

var _imagemin = _interopRequireDefault(require('imagemin'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

var assign = global.fis.util.assign
var log = global.fis.log
var hasOwn = Object.prototype.hasOwnProperty

function requireImageminPlugin(name, options) {
  var pluginName = 'imagemin-'.concat(name)

  try {
    return require(pluginName)(options)
  } catch (_unused) {
    log.warn(
      'Unknown plugin: ['.concat(pluginName, ']. ') +
        '\n' +
        'You can install it with: npm install '.concat(pluginName)
    )
    process.exit(1)
  }
}

function buildProcesser(pluginName, pluginOptions) {
  var standalone = true

  if (arguments.length === 1) {
    pluginOptions = pluginName
    pluginName = ''
    standalone = false
  }

  function processor(content, file, config_) {
    var imageminPlugins = []

    if (standalone) {
      imageminPlugins[0] = requireImageminPlugin(
        pluginName,
        assign({}, pluginOptions, config_)
      )
    } else {
      var config = config_[file.ext]

      for (var name in config) {
        if (hasOwn.call(config, name)) {
          var defaultOptions =
            pluginOptions[file.ext] &&
            pluginOptions[file.ext][name] &&
            pluginOptions[file.ext][name].options
          imageminPlugins.push(
            requireImageminPlugin(
              name,
              assign({}, defaultOptions, config[name])
            )
          )
        }
      }
    }

    try {
      return (0, _promiseSynchronizer['default'])(
        _imagemin['default'].buffer(content, {
          plugins: imageminPlugins,
        })
      )
    } catch (error) {
      log.warn('%s might not compressed due to:\n %s', file.id, error)
      process.exit(1)
    }
  }

  processor.defaultOptions = pluginOptions
  return processor
}

module.exports = buildProcesser
