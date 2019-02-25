let fs = require('fs')
let path = require('path')
let _ = require('lodash')
let prettier = require('prettier')

let CHARSET = 'utf-8'
let DEST = path.join(__dirname, '..', 'packages')
let SOURCE = path.join(__dirname, '..', 'src')
let packages = require('../packages.js')
let LICENSE = fs.readFileSync('../LICENSE', CHARSET)
let stringify = require('json-stable-stringify')
const babel = require('@babel/core')
const babelConfig = path.join(__dirname, '..', 'babel.config.js')

let packageJSON = require('../package.json')
let dependencies = _.assign(
  {},
  packageJSON.dependencies,
  packageJSON.devDependencies,
  packageJSON.optionalDependencies
)

function getDependency(name) {
  let version = dependencies[name]
  if (!version) {
    throw new Error('dependency [%s] is not in package.json.', name)
  }

  let dependency = {}
  dependency[name] = version
  return dependency
}

let commonDependencies = _.reduce(
  packages.dependencies,
  function(acc, current) {
    return _.assign(acc, getDependency(current))
  },
  {}
)

let template = (function(cache) {
  return function(file) {
    file = path.join(SOURCE, file)

    if (cache[file]) {
      return cache[file]
    }

    let compiled
    try {
      compiled = (function(source) {
        return function() {
          return source
        }
      })(fs.readFileSync(file, CHARSET))
    } catch (err) {
      compiled = _.template(fs.readFileSync(file + '.ejs', CHARSET), {
        imports: {
          stringify,
        },
      })
    }

    if (/\.js$/.test(file)) {
      compiled = (function(compiled) {
        let prettierConfig = prettier.resolveConfig.sync(file, {
          editorconfig: true,
        })
        return function(...args) {
          let code = compiled.apply(this, args)
          code = babel.transformSync(code, {
            filename: file,
            configFile: babelConfig,
          }).code
          code = prettier.format(code, prettierConfig)
          return code
        }
      })(compiled)
    }

    return (cache[file] = compiled)
  }
})({})

function packageBuilder() {
  let pkg = this.package

  try {
    fs.mkdirSync(DEST)
  } catch (err) {}
  try {
    fs.mkdirSync(path.join(DEST, pkg.name))
  } catch (err) {}

  _.forEach(
    pkg.files,
    function(file) {
      let source = template(file)(this)
      fs.writeFileSync(path.join(DEST, pkg.name, file), source)
    }.bind(this)
  )
}

function optinumPackage(pkg) {
  pkg.repository += '/tree/master/packages/' + pkg.name
  pkg.keywords.sort()
  delete pkg.devDependencies
  delete pkg.optionalDependencies
  delete pkg.scripts
  delete pkg.config
  pkg.files = packages.files.sort()

  return pkg
}

function StandalonePackage(plugin) {
  let pkg = _.assign({}, packageJSON)
  pkg.name = plugin.package || packageJSON.name + '-' + plugin.name
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
  let plugins = {}
  let options = {}
  let keywords = []
  let dependencies = {}

  _.forEach(packages.plugins, function(pluginsForExt, ext) {
    ext = '.' + ext
    let plugin = pluginsForExt[0]
    delete plugin.default
    plugins[ext] = plugin

    options[ext] = {}
    options[ext][plugin.name] = plugin.options || {}
    keywords.push(plugin.name)
    dependencies = _.assign(dependencies, plugin.dependencies)
  })

  let pkg = _.assign({}, packageJSON)
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
  let scripts = _.map(packages, function(pkg) {
    return [
      'cd ' + pkg.package.name,
      'npm --registry=https://registry.npmjs.org/ publish',
      'cd ..',
    ]
  })

  fs.writeFileSync(DEST + 'publish.sh', _.flatten(scripts).join('\n'))
}

let npmPackages = []

// AllInOne
npmPackages.push(new AllInOnePackage())

// StandalonePackage
_.forEach(packages.plugins, function(plugins, ext) {
  npmPackages = npmPackages.concat(
    _.map(plugins, function(plugin) {
      return new StandalonePackage(
        _.assign(plugin, {
          ext: '.' + ext,
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
