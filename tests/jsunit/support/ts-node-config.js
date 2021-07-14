require('ts-node').register({
  project: 'tsconfig.test.json',
  files: true,
  pretty: true,
  'no-cache': true,
  ignore: [ /node_modules\/(?!@get-set-fetch\/test-utils)/ ]
})
