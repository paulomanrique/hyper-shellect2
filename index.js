'use strict'

const fs = require('fs')
const config = require('./app/config')
const shell = require('./app/shell')

let baseDirectory = __dirname
let shellectConfig = {}

exports.onApp = app => {
  const shellectConf = config.parse(app.config.getConfig())

  if (shellectConf.colorsEnabled) {
    shellectConfig.SHELLECT_COLORS = shellectConf.colorsEnabled
  } else {
    shellectConfig.SHELLECT_COLORS = false
  }

  if (shellectConf.shells) {
    shellectConfig.SHELLECT_SHELLS = shellectConf.shells
  } else {
    shellectConfig.SHELLECT_SHELLS = shell.detect()
  }
}

exports.onWindow = window => {
  window.rpc.on('shellect', ({ uid }) => {
    writeFileStream(
      `${baseDirectory}/.env.json`,
      JSON.stringify(shellectConfig, null, 2)
    ).then(() => {
      window.sessions.get(uid).write(`node "${baseDirectory}/run.js"` + '\r')
    })
  })
}

exports.onRendererWindow = window => {
  waitFor(window, 'rpc', rpc => {
    rpc.on('session add', details => {
      const { uid } = details
      rpc.emit('shellect', { uid })
    })
  })
}

function waitFor (object, key, fn) {
  if (key in object) {
    fn(object[key])
  } else {
    setTimeout(() => waitFor(object, key, fn), 10)
  }
}

async function writeFileStream (filePath, data) {
  let writeStream = fs.createWriteStream(filePath, {
    encoding: 'utf-8',
    flag: 'w'
  })
  return writeStream.write(data)
}
