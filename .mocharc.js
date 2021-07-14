module.exports = {
  diff: true,
  recursive: true,
  extension: ['ts'],
  package: './package.json',
  reporter: 'spec',
  timeout: 55000,
  file: [ './tests/jsunit/support/ts-node-config.js', './tests/jsunit/support/domMocker.js' ]
}
