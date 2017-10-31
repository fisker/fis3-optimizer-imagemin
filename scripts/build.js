var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var prettier = require('prettier')
var prettierConfig = require('../prettier.config.js')

var pkg = require('../package.json')
var LICENSE = fs.readFileSync('../LICENSE', 'utf-8')
var projectName = pkg.name
var dest = '../packages/'
var src = '../src/'

var packages = require(src + 'packages.js')
var dependencies = packages.dependencies
var packageSrcFiles = [
  'package.json.tmpl',
  'README.md.tmpl',
  'index.js.tmpl',
  'LICENSE.tmpl',
  'processor.js'
]

var packageFiles = packageSrcFiles
  .map(function(file) {
    return file.replace(/\.tmpl$/, '')
  })
  .sort()

var getTemplate = (function(cache) {
  return function(file) {
    file = path.join(src, file)

    if (cache[file]) {
      return cache[file]
    }

    return (cache[file] = _.template(fs.readFileSync(file, 'utf-8')))
  }
})({})

function sortObject(obj) {
  return _.reduce(
    _.keys(obj).sort(),
    function(acc, key) {
      acc[key] = obj[key]
      return acc
    },
    {}
  )
}

function packageBuilder() {
  var package = this.package
  package.repository += '/tree/master/packages/' + package.name
  package.keywords.sort()
  package.dependencies = sortObject(package.dependencies)
  delete package.devDependencies
  delete package.scripts
  package.files = packageFiles

  try {
    fs.mkdirSync(dest)
  } catch (_) {}
  try {
    fs.mkdirSync(dest + package.name)
  } catch (_) {}

  var data = {
    standalone: this.standalone,
    plugin: this.plugin,
    plugins: this.plugins,
    package: package,
    options: this.options,
    LICENSE: LICENSE
  }

  _.forEach(
    packageSrcFiles,
    function(file) {
      var source = getTemplate(file)(data)
      if (/\.tmpl$/.test(file)) {
        file = file.slice(0, -5)
      }
      if (/\.js$/.test(file)) {
        source = prettier.format(source, prettierConfig)
      }
      fs.writeFileSync(dest + this.package.name + '/' + file, source)
    }.bind(this)
  )
}

function getDefaultPlugin(plugins) {
  for (var name in plugins) {
    if (plugins[name].default) {
      return _.assign(
        {
          name: name
        },
        plugins[name]
      )
    }
  }

  for (var plugin in plugins) {
    return _.assign(
      {
        name: name
      },
      plugins[name]
    )
  }
}

function StandalonePackage(plugin, name) {
  plugin.name = plugin.name || name
  plugin.options = plugin.options || {}

  var package = _.assign({}, pkg)
  package.name = plugin.package || pkg.name + '-' + name
  package.keywords = [].concat(package.keywords, [plugin.name])

  package.dependencies = _.assign({}, dependencies, package.dependencies)
  package.dependencies['imagemin-' + plugin.name] = plugin.version

  delete plugin.default
  delete plugin.package

  this.standalone = true
  this.plugin = plugin
  this.package = package
  this.options = plugin.options
}

function AllInOnePackage(packages) {
  var plugins = {}
  var options = {}

  _.forEach(packages, function(all, ext) {
    ext = '.' + ext
    var plugin = _.assign(
      {
        ext: ext
      },
      getDefaultPlugin(all)
    )
    delete plugin.default
    plugins[plugin.name] = plugin

    options[ext] = {}
    options[ext][plugin.name] = plugin.options || {}
  })

  var package = _.assign({}, pkg)
  package.keywords = [].concat(
    package.keywords,
    _.map(plugins, function(plugin) {
      return plugin.name
    })
  )

  package.dependencies = _.assign({}, dependencies, package.dependencies)
  _.forEach(plugins, function(plugin) {
    package.dependencies['imagemin-' + plugin.name] = plugin.version
  })

  this.standalone = false
  this.package = package
  this.plugins = plugins
  this.options = options
}

StandalonePackage.prototype.build = AllInOnePackage.prototype.build = packageBuilder

function buildPublicScript(packages) {
  var scripts = _.map(packages, function(pkg) {
    return [
      'cd ' + pkg.package.name,
      'npm --registry=https://registry.npmjs.org/ publish',
      'cd ..'
    ]
  })

  fs.writeFileSync(dest + 'publish.sh', _.flatten(scripts).join('\n'))
}

var npmPackages = []

// AllInOne
npmPackages.push(new AllInOnePackage(packages.plugins))

// StandalonePackage
_.forEach(packages.plugins, function(plugins, ext) {
  _.forEach(plugins, function(plugin, name) {
    var pkg = new StandalonePackage(
      _.assign(plugin, {
        ext: '.' + ext
      }),
      name
    )
    npmPackages.push(pkg)
  })
})

npmPackages.forEach(function(pkg) {
  pkg.build()
})

// build publish scripts
// buildPublicScript(npmPackages)
