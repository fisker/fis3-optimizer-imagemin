var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var prettier = require('prettier')
var prettierConfig = require('../prettier.config.js')

var CHARSET = 'utf-8'
var DEST = path.join(__dirname, '..', 'packages')
var SOURCE = path.join(__dirname, '..', 'src')
var packages = require('../packages.js')
var LICENSE = fs.readFileSync('../LICENSE', CHARSET)
var stringify = require('json-stable-stringify')

var package = require('../package.json')

function getDependency(name) {
  var version = package.dependencies[name]
  if (!version) {
    throw Error('dependency [%s] is not in package.json.', name)
  }

  var dependency = {}
  dependency[name] = version
  return dependency
}

var commonDependencies = _.reduce(
  packages.dependencies,
  function(acc, current) {
    return _.assign(acc, getDependency(current))
  },
  {}
)

var template = (function(cache) {
  return function(file) {
    file = path.join(SOURCE, file)

    if (cache[file]) {
      return cache[file]
    }

    var compiled
    try {
      compiled = (function(source) {
        return function() {
          return source
        }
      })(fs.readFileSync(file, CHARSET))
    } catch (err) {
      compiled = _.template(fs.readFileSync(file + '.tmpl', CHARSET), {
        imports: {
          stringify: stringify
        }
      })
    }

    if (/\.js$/.test(file)) {
      compiled = (function(compiled) {
        return function() {
          var source = compiled.apply(this, arguments)
          return prettier.format(source, prettierConfig)
        }
      })(compiled)
    }

    return (cache[file] = compiled)
  }
})({})

function packageBuilder() {
  var package = this.package

  try {
    fs.mkdirSync(DEST)
  } catch (err) {}
  try {
    fs.mkdirSync(path.join(DEST, package.name))
  } catch (err) {}

  _.forEach(
    package.files,
    function(file) {
      var source = template(file)(this)
      fs.writeFileSync(path.join(DEST, package.name, file), source)
    }.bind(this)
  )
}

function optinumPackage(pkg) {
  pkg.repository += '/tree/master/packages/' + pkg.name
  pkg.keywords.sort()
  delete pkg.devDependencies
  delete pkg.scripts
  pkg.files = packages.files.sort()

  return pkg
}

function StandalonePackage(plugin) {
  var pkg = _.assign({}, package)
  pkg.name = plugin.package || package.name + '-' + plugin.name
  pkg.keywords = pkg.keywords.slice().concat([plugin.name])

  pkg.dependencies = _.assign(
    {},
    commonDependencies,
    plugin.dependencies,
    getDependency('imagemin-' + plugin.name)
  )

  delete plugin.package

  this.standalone = true
  this.plugin = plugin
  this.package = optinumPackage(pkg)
  this.options = plugin.options || {}
  this.LICENSE = LICENSE
}

function AllInOnePackage() {
  var plugins = {}
  var options = {}
  var keywords = []
  var dependencies = {}

  _.forEach(packages.plugins, function(pluginsForExt, ext) {
    ext = '.' + ext
    var plugin = pluginsForExt[0]
    delete plugin.default
    plugins[ext] = plugin

    options[ext] = {}
    options[ext][plugin.name] = plugin.options || {}
    keywords.push(plugin.name)
    dependencies = _.assign(dependencies, plugin.dependencies)
  })

  var pkg = _.assign({}, package)
  pkg.keywords = pkg.keywords.slice().concat(keywords)

  pkg.dependencies = _.assign({}, commonDependencies, dependencies)
  _.forEach(plugins, function(plugin) {
    _.assign(pkg.dependencies, getDependency('imagemin-' + plugin.name))
  })

  this.standalone = false
  this.package = optinumPackage(pkg)
  this.plugins = plugins
  this.options = options
  this.LICENSE = LICENSE
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

  fs.writeFileSync(DEST + 'publish.sh', _.flatten(scripts).join('\n'))
}

var npmPackages = []

// AllInOne
npmPackages.push(new AllInOnePackage())

StandalonePackage
_.forEach(packages.plugins, function(plugins, ext) {
  npmPackages = npmPackages.concat(
    _.map(plugins, function(plugin) {
      return new StandalonePackage(
        _.assign(plugin, {
          ext: '.' + ext
        })
      )
    })
  )
})

npmPackages.forEach(function(pkg) {
  pkg.build()
})

// build publish scripts
// buildPublicScript(npmPackages)
