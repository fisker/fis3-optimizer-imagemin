
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        "targets": {
          "node": "0.8"
        },
        useBuiltIns: false,
          debug: true
      }
    ]
  ]
}
