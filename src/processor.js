import sync from 'promise-synchronizer'
import imagemin from 'imagemin'

const assign = global.fis.util.assign
const log = global.fis.log
const hasOwn = Object.prototype.hasOwnProperty

function requireImageminPlugin(name, options) {
  const pluginName = 'imagemin-' + name
  try {
    return require(pluginName)(options)
  } catch {
    log.warn(
      `Unknown plugin: [${pluginName}]. ` +
        '\n' +
        `You can install it with: npm install ${pluginName}`
    )

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}

function buildProcesser(pluginName, pluginOptions) {
  let standalone = true
  if (arguments.length === 1) {
    pluginOptions = pluginName
    pluginName = ''
    standalone = false
  }

  function processor(content, file, conf) {
    const imageminPlugins = []

    if (standalone) {
      imageminPlugins[0] = requireImageminPlugin(
        pluginName,
        assign({}, pluginOptions, conf)
      )
    } else {
      const config = conf[file.ext]
      for (const name in config) {
        if (hasOwn.call(config, name)) {
          const defaultOptions =
            pluginOptions[file.ext] &&
            pluginOptions[file.ext][name] &&
            pluginOptions[file.ext][name].options
          imageminPlugins.push(
            requireImageminPlugin(
              name,
              assign({}, defaultOptions, config[name])
            )
          )
        }
      }
    }

    try {
      return sync(
        imagemin.buffer(content, {
          plugins: imageminPlugins,
        })
      )
    } catch (err) {
      log.warn('%s might not compressed due to:\n %s', file.id, err)

      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1)
    }
  }

  processor.defaultOptions = pluginOptions

  return processor
}

module.exports = buildProcesser
