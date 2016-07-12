/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

var imagemin = require('imagemin');
var spawnSync = require('child_process').spawnSync;
var path = require('path');
var nodePath = 'node';
var imageminBin = path.normalize(path.join(__dirname, './bin/imagemin.js'));
var assign = require('lodash.assign');
var log = (global.fis && fis.log) || console;

var defaultPluginOptions = {
  'pngquant': {
    quality: '65-80',
    speed: 1,
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

  var config = {
    plugins: pluginConf
  };

  var result = spawnSync(nodePath, [
    imageminBin,
    JSON.stringify(config),
    ], {
    input: content
  });

  var errmsg = result.stderr + '';
  if (errmsg) {
    console.log(result.stderr + '');
    process.exit(1);
  }

  if (result.stdout) {
    if (result.stdout.length < content.length) {
      return result.stdout;
    } else {
      log.warn('%s might not compressed.', file.id);
      return content;
    }
  }

  return content;
};

function getDefaultConfig(pluginName) {
  return {
    pluginName: defaultPluginOptions[pluginName]
  };
}

module.exports.defaultOptions = {
  '.png': getDefaultConfig('pngquant'),
  '.jpg': getDefaultConfig('mozjpeg'),
  '.webp': getDefaultConfig('webp'),
  '.svg': getDefaultConfig('svgo'),
};
