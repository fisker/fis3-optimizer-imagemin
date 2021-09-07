import sync from 'promise-synchronizer'
import {buffer as imageminBuffer} from 'imagemin'

const {assign} = global.fis.util
const {log} = global.fis
const hasOwn = Object.prototype.hasOwnProperty
const imageminBufferSync = sync(imageminBuffer)

function requireImageminPlugin(name, options) {
  const pluginName = `imagemin-${name}`
  try {
    return require(pluginName)(options)
  } catch {
    log.warn(
      `Unknown plugin: [${pluginName}]. ` +
        '\n' +
        `You can install it with: npm install ${pluginName}`,
    )

    process.exit(1)
  }
}

function buildProcessor(pluginName, pluginOptions) {
  let standalone = true
  if (arguments.length === 1) {
    pluginOptions = pluginName
    pluginName = ''
    standalone = false
  }

  function processor(content, file, config_) {
    const imageminPlugins = []

    if (standalone) {
      imageminPlugins[0] = requireImageminPlugin(
        pluginName,
        assign({}, pluginOptions, config_),
      )
    } else {
      const config = config_[file.ext]
      for (const name in config) {
        if (hasOwn.call(config, name)) {
          const defaultOptions =
            pluginOptions[file.ext] &&
            pluginOptions[file.ext][name] &&
            pluginOptions[file.ext][name].options
          imageminPlugins.push(
            requireImageminPlugin(
              name,
              assign({}, defaultOptions, config[name]),
            ),
          )
        }
      }
    }

    try {
      return imageminBufferSync(content, {
        plugins: imageminPlugins,
      })
    } catch (error) {
      log.warn('%s might not compressed due to:\n %s', file.id, error)

      process.exit(1)
    }
  }

  processor.defaultOptions = pluginOptions

  return processor
}

module.exports = buildProcessor
