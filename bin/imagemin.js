var imagemin = require('imagemin');
var config = JSON.parse(process.argv[2]);
var pluginConfig = config.plugins || {};
var plugins = [];
for (var pluginName in pluginConfig) {
  if (pluginConfig.hasOwnProperty(pluginName)) {
    try {
      var plugin = require('imagemin-' + pluginName);
      if (typeof plugin === 'function') {
        plugins.push(plugin(pluginConfig[pluginName]));
      }
    } catch (err) {
      console.log('can\'t load imagemin plugin [imagemin-' + pluginName + ']');
      process.exit(1);
    }
  }
}

process.stdin.on('readable', function() {
  var content = process.stdin.read();
  if (content) {
    processImg(content);
  }
});

function processImg(content) {
  imagemin.buffer(content, {
    plugins: plugins
  })
    .then(function(data) {
      process.stdout.write(data);
    })
    .catch(function(err) {
      console.log(err);
      process.exit(1);
    });
}
