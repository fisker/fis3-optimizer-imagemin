const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const prettier = require('prettier')

const CHARSET = 'utf-8'
const DEST = path.join(__dirname, '..', 'packages')
const SOURCE = path.join(__dirname, '..', 'src')
const LICENSE = fs.readFileSync('../LICENSE', CHARSET)
const stringify = require('json-stable-stringify')
const babel = require('@babel/core')
const packages = require('../packages.js')
const babelConfig = path.join(__dirname, '..', 'babel.config.js')

const packageJSON = require('../package.json')
const dependencies = _.assign(
  {},
  packageJSON.dependencies,
  packageJSON.devDependencies,
  packageJSON.optionalDependencies
)

function getDependency(name) {
  const version = dependencies[name]
  if (!version) {
    throw new Error('dependency [%s] is not in package.json.', name)
  }

  const dependency = {}
  dependency[name] = version
  return dependency
}

const commonDependencies = _.reduce(
  packages.dependencies,
  function(acc, current) {
    return _.assign(acc, getDependency(current))
  },
  {}
)

const template = (function(cache) {
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
    } catch (error) {
      compiled = _.template(fs.readFileSync(`${file}.ejs`, CHARSET), {
        imports: {
          stringify,
        },
      })
    }

    if (/\.js$/.test(file)) {
      compiled = (function(compiled) {
        return function(...args) {
          let code = compiled.apply(this, args)
          code = babel.transformSync(code, {
            filename: file,
            configFile: babelConfig,
          }).code
          return code
        }
      })(compiled)
    }

    return (cache[file] = compiled)
  }
})({})

function packageBuilder() {
  const pkg = this.package

  try {
    fs.mkdirSync(DEST)
  } catch (error) {}
  try {
    fs.mkdirSync(path.join(DEST, pkg.name))
  } catch (error) {}

  _.forEach(
    pkg.files,
    function(file) {
      const source = template(file)(this)
      writeFile(path.join(DEST, pkg.name, file), source)
    }.bind(this)
  )
}

function writeFile(file, content) {
  if (/.(js|md|json)$/.test(file)) {
    const prettierConfig = prettier.resolveConfig.sync(file, {
      editorconfig: true,
    })
    content = prettier.format(content, prettierConfig)
  }

  fs.writeFileSync(file, content)
}

function optinumPackage(pkg) {
  pkg.repository += `/tree/master/packages/${pkg.name}`
  pkg.keywords.sort()
  delete pkg.devDependencies
  delete pkg.optionalDependencies
  delete pkg.scripts
  delete pkg.config
  pkg.files = packages.files.sort()

  return pkg
}

function StandalonePackage(plugin) {
  const pkg = _.assign({}, packageJSON)
  pkg.name = plugin.package || `${packageJSON.name}-${plugin.name}`
  pkg.keywords = pkg.keywords.slice().concat([plugin.name])

  pkg.dependencies = _.assign(
    {},
    commonDependencies,
    plugin.dependencies,
    getDependency(`imagemin-${plugin.name}`)
  )

  delete plugin.package

  this.standalone = true
  this.plugin = plugin
  this.package = optinumPackage(pkg)
  this.options = plugin.options || {}
  this.LICENSE = LICENSE
}

function AllInOnePackage() {
  const plugins = {}
  const options = {}
  const keywords = []
  let dependencies = {}

  _.forEach(packages.plugins, function(pluginsForExt, ext) {
    ext = `.${ext}`
    const plugin = pluginsForExt[0]
    delete plugin.default
    plugins[ext] = plugin

    options[ext] = {}
    options[ext][plugin.name] = plugin.options || {}
    keywords.push(plugin.name)
    dependencies = _.assign(dependencies, plugin.dependencies)
  })

  const pkg = _.assign({}, packageJSON)
  pkg.keywords = pkg.keywords.slice().concat(keywords)

  pkg.dependencies = _.assign({}, commonDependencies, dependencies)
  _.forEach(plugins, function(plugin) {
    _.assign(pkg.dependencies, getDependency(`imagemin-${plugin.name}`))
  })

  this.standalone = false
  this.package = optinumPackage(pkg)
  this.plugins = plugins
  this.options = options
  this.LICENSE = LICENSE
}

StandalonePackage.prototype.build = AllInOnePackage.prototype.build = packageBuilder

let npmPackages = []

// AllInOne
npmPackages.push(new AllInOnePackage())

// StandalonePackage
_.forEach(packages.plugins, function(plugins, ext) {
  npmPackages = npmPackages.concat(
    _.map(plugins, function(plugin) {
      return new StandalonePackage(
        _.assign(plugin, {
          ext: `.${ext}`,
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
