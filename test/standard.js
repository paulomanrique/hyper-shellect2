const standard = require('mocha-standard')
const path = require('path')

const appDir = path.join(__dirname, '../app/')
const binDir = path.join(__dirname, '../bin/')

const files = [
  path.join(appDir, 'controllers/*.js'),
  path.join(appDir, 'helpers/*.js'),
  path.join(appDir, 'middlewares/*.js'),
  path.join(appDir, 'models/*.js'),
  path.join(appDir, 'views/*.js'),
  path.join(appDir, '/*.js'),
  path.join(binDir, '/*.js')
]

describe('Style Standard', () => {
  it('conforms to standard', standard.files(files)).timeout(60000)
})
