const wpi18n = require('node-wp-i18n')

// update options below appropriately
// To run: node make-translation.js
let options = {
  cwd: `${process.cwd()}`,
  exclude: [ 'public/.*', 'vendor/.*', 'tests/.*', 'node_modules/.*' ],
  processPot: function (pot) {
    delete pot.headers['x-generator']
    return pot
  },
  type: 'wp-plugin',
  updateTimestamp: false,
  domainPath: "languages",
  potHeaders: {
    poedit: true,
    "x-poedit-basepath": ".."
  },
}

wpi18n.makepot(options)
