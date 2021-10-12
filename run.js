'use strict'

const fs = require('fs')
const path = require('path')
const prompt = require('./app/prompt')

const configFile = '.env.json'
fs.closeSync(fs.openSync(configFile, 'w'))
require('./app/env-json')(path.join(__dirname, configFile))

prompt.selectShell()
