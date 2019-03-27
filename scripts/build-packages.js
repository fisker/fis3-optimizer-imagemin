import fs from 'fs'
import {join} from 'path'
import _ from 'lodash'
import prettier from 'prettier'
import stringify from 'json-stable-stringify'
import {transformSync} from '@babel/core'
import * as packages from '../packages'
import packageJSON from '../package.json'

const CHARSET = 'utf-8'
const DEST = join(__dirname, '..', 'packages')
const SOURCE = join(__dirname, '..', 'src')
const license = fs.readFileSync(join(__dirname, '..', 'license'), CHARSET)
const babelConfig = join(__dirname, '..', 'babel.config.js')

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
    file = join(SOURCE, file)

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
          code = transformSync(code, {
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
    fs.mkdirSync(join(DEST, pkg.name))
  } catch (error) {}

  _.forEach(
    pkg.files,
    function(file) {
      const source = template(file)(this)
      writeFile(join(DEST, pkg.name, file), source)
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

function fixPackage(pkg) {
  let {repository, homepage} = pkg
  if (typeof repository === 'string') {
    repository += `/tree/master/packages/${pkg.name}`
  } else {
    repository = {
      ...repository,
      url: `${repository.url}/tree/master/packages/${pkg.name}`,
    }
  }

  const arr = homepage.split('#')
  arr[0] += `/tree/master/packages/${pkg.name}`
  homepage = arr.join('#')

  pkg.homepage = homepage
  pkg.repository = repository
  pkg.keywords.sort()
  delete pkg.devDependencies
  delete pkg.optionalDependencies
  delete pkg.scripts
  delete pkg.config
  delete pkg.private
  pkg.files = packages.files
    .filter(file => !['license', 'readme.md', 'package.json'].includes(file))
    .sort()

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
  this.package = fixPackage(pkg)
  this.options = plugin.options || {}
  this.license = license
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
  this.package = fixPackage(pkg)
  this.plugins = plugins
  this.options = options
  this.license = license
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
