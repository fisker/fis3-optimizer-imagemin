/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

var syncPromise = require('promise-synchronizer');
var imagemin = require('imagemin');
var assign = require('object.assign').getPolyfill();
var log = (global.fis && fis.log) || console;

var defaultPluginOptions = {
  'upng': {
    cnum: 256
  },
  'jpegtran': {
    progressive: true,
  },
  'mozjpeg': {
    quality: 90,
    progressive: true,
  },
  'gifsicle': {
    optimizationLevel: 3,
  },
  'webp': {},
  'svgo': {},
};

module.exports = function(content, file, conf){
  var ext = file.ext;

  var pluginConf = conf[ext] || {};
  for (var pluginName in defaultPluginOptions) {
    if (pluginConf.hasOwnProperty(pluginName)) {
      pluginConf[pluginName] = assign({}, defaultPluginOptions[pluginName], pluginConf[pluginName]);
    }
  }

  var plugins = [];
  for (var pluginName in pluginConf) {
    if (pluginConf.hasOwnProperty(pluginName)) {
      try {
        var plugin = require('imagemin-' + pluginName);
        if (typeof plugin === 'function') {
          plugins.push(plugin(pluginConf[pluginName]));
        }
      } catch (err) {
        log.error('can\'t load imagemin plugin [imagemin-' + pluginName + ']');
        process.exit(1);
      }
    }
  }

  var promise = imagemin.buffer(content, {
    plugins: plugins
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
};

function getDefaultConfig(pluginName) {
  var conf = {};
  conf[pluginName] = defaultPluginOptions[pluginName];
  return conf;
}

module.exports.defaultOptions = {
  '.png': getDefaultConfig('upng'),
  '.jpg': getDefaultConfig('mozjpeg'),
  '.webp': getDefaultConfig('webp'),
  '.svg': getDefaultConfig('svgo'),
};
