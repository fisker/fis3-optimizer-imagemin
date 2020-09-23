import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import writePrettierFile from 'write-prettier-file'
import stringify from 'json-stable-stringify'
import sortPackageJson from 'sort-package-json'
import {transformSync} from '@babel/core'
import * as packages from '../packages'
import packageJSON from '../package.json'
import {version} from '../lerna.json'

const CHARSET = 'utf-8'
const DEST = path.join(__dirname, '../packages')
const SOURCE = path.join(__dirname, '../src')
const license = fs.readFileSync(path.join(__dirname, '../license'), CHARSET)
const babelConfig = path.join(__dirname, '../babel.config.js')
const commonfiles = ['license', 'readme.md', 'package.json']

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
  function (accumulator, current) {
    return _.assign(accumulator, getDependency(current))
  },
  {}
)

const template = (function (cache) {
  return function (file) {
    file = path.join(SOURCE, file)

    if (cache[file]) {
      return cache[file]
    }

    let compiled
    try {
      compiled = (function (source) {
        return function () {
          return source
        }
      })(fs.readFileSync(file, CHARSET))
    } catch {
      compiled = _.template(fs.readFileSync(`${file}.ejs`, CHARSET), {
        imports: {
          stringify,
          sortPackageJson,
        },
      })
    }

    if (/\.js$/.test(file)) {
      compiled = (function (compiled) {
        return function (...arguments_) {
          let code = compiled.apply(this, arguments_)
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
  const package_ = this.package

  try {
    fs.mkdirSync(DEST)
  } catch {}
  try {
    fs.mkdirSync(path.join(DEST, package_.name))
  } catch {}

  _.forEach(
    [...package_.files, ...commonfiles],
    function (file) {
      const source = template(file)(this)
      writeFile(path.join(DEST, package_.name, file), source)
    }.bind(this)
  )
}

function writeFile(file, content) {
  if (/.(js|md|json)$/.test(file)) {
    writePrettierFile(file, content)
  } else {
    fs.writeFileSync(file, content)
  }
}

function fixPackage(package_) {
  let {repository, homepage} = package_
  if (typeof repository === 'string') {
    if (!repository.startsWith('https://')) {
      repository = `https://github.com/${repository}`
    }
    repository += `/tree/master/packages/${package_.name}`
  } else {
    repository = {
      ...repository,
      url: `${repository.url}/tree/master/packages/${package_.name}`,
    }
  }

  const array = homepage.split('#')
  array[0] += `/tree/master/packages/${package_.name}`
  homepage = array.join('#')

  package_.homepage = homepage
  package_.repository = repository
  package_.keywords.sort()
  delete package_.devDependencies
  delete package_.optionalDependencies
  delete package_.scripts
  delete package_.workspaces
  delete package_.config
  delete package_.private
  package_.files = packages.files
    .filter((file) => !commonfiles.includes(file))
    .sort()

  return package_
}

function StandalonePackage(plugin) {
  const package_ = {
    ...packageJSON,
    version,
    name: plugin.package || `${packageJSON.name}-${plugin.name}`,
    keywords: [...packageJSON.keywords, plugin.name],
    dependencies: {
      ...commonDependencies,
      ...plugin.dependencies,
      ...getDependency(`imagemin-${plugin.name}`),
    },
  }

  delete plugin.package

  this.standalone = true
  this.plugin = plugin
  this.package = fixPackage(package_)
  this.options = plugin.options || {}
  this.license = license
}

function AllInOnePackage() {
  const plugins = {}
  const options = {}
  const keywords = []
  let dependencies = {}

  _.forEach(packages.plugins, function (pluginsForExtension, extension) {
    extension = `.${extension}`
    const plugin = pluginsForExtension[0]
    delete plugin.default
    plugins[extension] = plugin

    options[extension] = {}
    options[extension][plugin.name] = plugin.options || {}
    keywords.push(plugin.name)
    dependencies = _.assign(dependencies, plugin.dependencies)
  })

  const package_ = {
    ...packageJSON,
    version,
    keywords: [...packageJSON.keywords, ...keywords],
    dependencies: {
      ...commonDependencies,
      ...dependencies,
    },
  }

  _.forEach(plugins, function (plugin) {
    _.assign(package_.dependencies, getDependency(`imagemin-${plugin.name}`))
  })

  this.standalone = false
  this.package = fixPackage(package_)
  this.plugins = plugins
  this.options = options
  this.license = license
}

StandalonePackage.prototype.build = AllInOnePackage.prototype.build = packageBuilder

let npmPackages = []

// AllInOne
npmPackages.push(new AllInOnePackage())

// StandalonePackage
_.forEach(packages.plugins, function (plugins, extension) {
  npmPackages = npmPackages.concat(
    _.map(plugins, function (plugin) {
      return new StandalonePackage(
        _.assign(plugin, {
          ext: `.${extension}`,
        })
      )
    })
  )
})

npmPackages.forEach(function (package_) {
  package_.build()
})

// build publish scripts
// buildPublicScript(npmPackages)
