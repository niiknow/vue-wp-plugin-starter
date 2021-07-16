module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "useBuiltIns": "usage",
      "corejs": 3,
      "targets": "ie >= 11",
      "debug": false
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": false
    }]
  ]
}
