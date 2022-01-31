#!/usr/bin/env node
const wpi18n = require('node-wp-i18n')
const pkg = require('../package.json')

const headers = {
  poedit: true,
  'x-poedit-basepath': '..',
  'x-generator': 'node-wp-i18n ' + pkg.version
}

// update options below appropriately
const options = {
  cwd: `${process.cwd()}`,
  exclude: [ 'public/.*', 'vendor/.*', 'tests/.*', 'node_modules/.*' ],
  processPot: function (pot) {
    delete pot.headers['x-generator']
    return pot
  },
  type: 'wp-plugin',
  updateTimestamp: false,
  domainPath: 'languages',
  potHeaders: headers,
}

wpi18n.makepot(options)
