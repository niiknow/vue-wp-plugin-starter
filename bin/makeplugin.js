#!/usr/bin/env node
// init plugin

const fs = require('fs')
const path = require('path')
const readline = require('node:readline/promises')
const glob = require('glob')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const base_path = path.resolve(process.cwd())
const template_file = 'vue-wp-plugin-starter.php'

const options = {
  PluginName: '',    // the name, example: Hello World
  PluginPrefix: '',  // plugin prefix, which can be use like so:
// language domain: hello_world
// admin url:       admin.php?page=hello_world#/settings

  PluginSpace: '',   // the namespace: HelloWorld
  PluginFileName: '' // the file name: wp-hello-world.php
}

if (!fs.existsSync(template_file)) {
  rl.write(`!!! Unexpected error.  Failed to locate template file ${template_file}`)
  process.exit(1)
}

const getPluginName = async () => {
  const answer = await rl.question('To begin, input your plugin name and press [ENTER]: ')

  if (!/^[A-Z][A-Za-z0-9]*( [A-Z][A-Za-z0-9]*)*$/.test(answer)) {
    rl.write(`Malformed name ${answer}. Please use title-case words separated by spaces. No hyphens. For example, 'Hello World'.`)
    return await getPluginName()
  }

  options.PluginName = answer
}

rl.on('close', async () => {
  const files = glob.sync('**/*.php',
    {
      expand: true,
      dot: false,
      cwd: base_path,
      ignore: [
        '.git/**',
        'assets/**',
        'bin/**',
        'node_modules/**',
        'public/**',
        'src/**',
        'vendor/**'
      ]
    })
  files.push('readme.txt')
  files.push('composer.json')
  files.push('package.json')
  files.push('tailwind.js')
  files.push('assets/admin.html')
  files.push('assets/frontend.html')
  files.push('assets/frontview.html')
  console.log('applying options: ', options)
  applyOptions(options, files)


  console.log('Removing template files')
  rename(template_file, `${options.PluginFileName}.php`)
  fs.unlinkSync('composer.lock')
  fs.unlinkSync('package-lock.json')
  process.exit(0)
})

function applyOptions(options, files) {
  files.forEach((file) => {
    console.log('applying to file', file)
    let file_path = path.resolve(base_path, file)
    let data = fs.readFileSync(file_path, 'utf8')

    for (const [key, value] of Object.entries(options)) {
      // let find = '\\$\\{' + key + '\\}';
      const find = key
      let re = new RegExp(find, 'g')

      data = data.replace(re, value)
    }

    fs.writeFileSync(file_path, data, 'utf8')
  })
}

function rename(from_path, to_path) {
  fs.renameSync(
    path.resolve(base_path, from_path),
    path.resolve(base_path, to_path)
  )
}

function createPrefix(str) {
  return (str || '').toLowerCase().replace(/\s+/g, ' ').replace(/[^0-9a-z_]+/g,'_')
}

function createNamespace(str) {
  return (str || '').replace(/['\.\s]/g, '')
}

(async () => {
  await getPluginName()
  options.PluginSpace = createNamespace(options.PluginName)
  options.PluginPrefix = createPrefix(options.PluginName)
  options.PluginFileName = options.PluginPrefix.replace(/_/g, '-')

  const prepend = await rl.question('Do you want to prepend \'wp-\' to your plugin file name? [y/n]: ')
  if (prepend.toLowerCase() === 'y') {
    options.PluginFileName = 'wp-' + options.PluginFileName
  }

  rl.close()
})()
