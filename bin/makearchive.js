#!/usr/bin/env node
// this is use to make deployment zip file

const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const IGNORE_LIST_FILENAME = '.gitattributes'
const CURRENT_PATH = path.resolve(process.cwd())

const loadIgnoreFile = () => {
  try {
    const fileList = fs.readFileSync(CURRENT_PATH + `/${IGNORE_LIST_FILENAME}`).toString().split('\n')
          // .replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "")
    const result = []
    fileList.forEach(f => {
      if (f.indexOf(' export-ignore') > 0) {
        const patterns = f.split(' ')
        result.push(patterns[0].trim())
      }
    })

    return result
  } catch (err) {
    return []
  }
}

const archive = archiver('zip', {
    zlib: {
      level: 9
    }
  })
const dirName = path.basename(CURRENT_PATH)
const outFile = './' + dirName + '.zip'

if (fs.existsSync(outFile)) {
  fs.unlinkSync(outFile)
}
console.time(`${outFile} zipped in`)

const output     = fs.createWriteStream(outFile)
const ignoreList = loadIgnoreFile()
ignoreList.push(outFile)

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
  console.log('>', (archive.pointer() / 1000000) + ' megabytes')
})

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function() {
  console.log('Data has been drained')
})

output.on('finish', () => console.timeEnd(`${outFile} zipped in`))

archive.on('entry', function (entry) {
  console.log('adding', entry.name)
})

archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    console.log('WARNING', err)
  } else {
    // throw error
    throw err
  }
})

// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err
})

archive.pipe(output)

archive.glob('**/*',
  {
    expand: true,
    cwd: CURRENT_PATH,
    ignore: ignoreList,
    dot: true
  },
  {
    prefix: dirName
  })

archive.finalize()
