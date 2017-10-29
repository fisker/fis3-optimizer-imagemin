'use strict'

var syncPromise = require('promise-synchronizer')
var imagemin = require('imagemin')
var assign = require('object.assign').getPolyfill()
var log = (global.fis && fis.log) || console

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

function buildProcesser(plugins, standalone) {
  var defaultOptions = {}

  if (standalone) {
    defaultOptions = plugins.options
  } else {
    for (var name in plugins) {
      if (plugins.hasOwnProperty(name)) {
        var plugin = plugins[name]
        var ext = plugin.ext
        defaultOptions[ext] = {}
        defaultOptions[ext][name] = plugin
      }
    }
  }

  function processor(content, file, conf) {
    var imageminPlugins = []

    if (standalone) {
      imageminPlugins[0] = requireImageminPlugin(
        name,
        assign({}, plugins.options, conf)
      )
    } else {
      var config = conf[file.ext]
      for (var pluginName in config) {
        if (config.hasOwnProperty(pluginName)) {
          imageminPlugins.push(
            requireImageminPlugin(
              pluginName,
              assign(
                {},
                plugins[pluginName] && plugins[pluginName].options,
                config[pluginName]
              )
            )
          )
        }
      }
    }

    var promise = imagemin
      .buffer(content, {
        plugins: imageminPlugins
      })
      .then(function(data) {
        content = data
      })
      .catch(function(err) {
        log.warn('%s might not compressed due to:\n %s', file.id, err)
        process.exit(1)
      })

    syncPromise(promise)

    return content
  }

  processor.defaultOptions = defaultOptions

  return processor
}

module.exports = buildProcesser
