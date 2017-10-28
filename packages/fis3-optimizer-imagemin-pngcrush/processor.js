'use strict';

var syncPromise = require('promise-synchronizer')
var imagemin = require('imagemin')
var assign = require('object.assign').getPolyfill()
var log = (global.fis && fis.log) || console
var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

function buildProcesser(plugins, standalone) {
  var defaultOptions = {}

  if (standalone) {
    defaultOptions = {
      options: plugin.options
    }
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
    var imageminPlugins

    if (standalone) {
      imageminPlugins = [require('imagemin-' + plugin.name)(assign({}, plugin.options, conf.options))]
    } else {
      var config = conf[file.ext]
      for (var pluginName in config) {
        if (config.hasOwnProperty(pluginName)) {
          try {
            imageminPlugins.push(require('imagemin-' + pluginName)(assign({}, plugins[pluginName] && plugins[pluginName].options, config[pluginName])))
          } catch (err) {
            log.warn('can\'t load plugin[image-' + pluginName + '].');
            process.exit(1);
          }
        }
      }
    }

    var promise = imagemin.buffer(content, {
      plugins: imageminPlugins
    })
      .then(function(data) {
        content = data;
      })
      .catch(function(err) {
        log.warn('%s might not compressed due to:\n %s', file.id, err);
        process.exit(1);
      });

    syncPromise(promise);

    return content;
  }

  processor.defaultOptions = defaultOptions

  return processor
}


module.exports = buildProcesser
