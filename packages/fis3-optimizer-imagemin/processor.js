'use strict'

var sync = require('promise-synchronizer')
var imagemin = require('imagemin')
var assign = global.fis.util.assign
var log = global.fis.log

function requireImageminPlugin(name, options) {
  var pluginName = 'imagemin-' + name
  try {
    return require(pluginName)(options)
  } catch (err) {
    log.warn(
      'Unknown plugin: [' +
        pluginName +
        ']. \n You can install it with: npm install ' +
        pluginName
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

  function processor(content, file, conf) {
    var imageminPlugins = []

    if (standalone) {
      imageminPlugins[0] = requireImageminPlugin(
        pluginName,
        assign({}, pluginOptions, conf)
      )
    } else {
      var config = conf[file.ext]
      for (var name in config) {
        if (config.hasOwnProperty(name)) {
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
      return sync(
        imagemin.buffer(content, {
          plugins: imageminPlugins
        })
      )
    } catch (err) {
      log.warn('%s might not compressed due to:\n %s', file.id, err)
      process.exit(1)
    }
  }

  processor.defaultOptions = pluginOptions

  return processor
}

module.exports = buildProcesser
