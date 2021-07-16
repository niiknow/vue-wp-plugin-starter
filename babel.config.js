module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "useBuiltIns": "usage",
      "corejs": 3,
      "targets": "> 1%, last 2 versions, ie >= 11",
      "debug": true
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": false
    }]
  ]
}
