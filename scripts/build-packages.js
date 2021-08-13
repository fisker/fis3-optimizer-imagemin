import {fileURLToPath} from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import writePrettierFile from 'write-prettier-file'
import _ from 'lodash'
import stringify from 'json-stable-stringify'
import sortPackageJson from 'sort-package-json'
import {transformSync} from '@babel/core'
import * as packages from '../packages.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packageJSON = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'))
)
const {version} = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../lerna.json'))
)

const CHARSET = 'utf-8'
const DEST = path.join(__dirname, '../packages')
const SOURCE = path.join(__dirname, '../src')
const license = fs.readFileSync(path.join(__dirname, '../license'), CHARSET)
const babelConfig = path.join(__dirname, '../babel.config.cjs')
const commonFiles = ['license', 'readme.md', 'package.json']

const dependencies = {
  ...packageJSON.dependencies,
  ...packageJSON.devDependencies,
  ...packageJSON.optionalDependencies,
}

function getDependency(name) {
  const version = dependencies[name]

  if (!version) {
    throw new Error('dependency [%s] is not in package.json.', name)
  }

  const dependency = {}
  dependency[name] = version
  return dependency
}

const commonDependencies = Object.assign(
  {},
  ...packages.dependencies.map((dependency) => getDependency(dependency))
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

  for (const file of [...package_.files, ...commonFiles]) {
    const source = template(file)(this)
    writeFile(path.join(DEST, package_.name, file), source)
  }
}

function writeFile(file, content) {
  if (/.(?:js|md|json)$/.test(file)) {
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
  delete package_.type
  delete package_.exports
  package_.files = packages.files
    .filter((file) => !commonFiles.includes(file))
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

  for (let [extension, pluginsForExtension] of Object.entries(
    packages.plugins
  )) {
    extension = `.${extension}`
    const plugin = pluginsForExtension[0]
    delete plugin.default
    plugins[extension] = plugin

    options[extension] = {}
    options[extension][plugin.name] = plugin.options || {}
    keywords.push(plugin.name)
    dependencies = _.assign(dependencies, plugin.dependencies)
  }

  const package_ = {
    ...packageJSON,
    version,
    keywords: [...packageJSON.keywords, ...keywords],
    dependencies: {
      ...commonDependencies,
      ...dependencies,
    },
  }

  for (const plugin of Object.values(plugins)) {
    Object.assign(
      package_.dependencies,
      getDependency(`imagemin-${plugin.name}`)
    )
  }

  this.standalone = false
  this.package = fixPackage(package_)
  this.plugins = plugins
  this.options = options
  this.license = license
}

StandalonePackage.prototype.build = AllInOnePackage.prototype.build =
  packageBuilder

let npmPackages = []

// AllInOne
npmPackages.push(new AllInOnePackage())

// StandalonePackage
for (const [extension, plugins] of Object.entries(packages.plugins)) {
  npmPackages = [
    ...npmPackages,
    ..._.map(
      plugins,
      (plugin) =>
        new StandalonePackage({
          ...plugin,
          ext: `.${extension}`,
        })
    ),
  ]
}

for (const package_ of npmPackages) {
  package_.build()
}

// build publish scripts
// buildPublicScript(npmPackages)
