const path = require('path')

const shell = {
  detect: () => {
    const os = process.env.OS
    let currentShell
    if (os === 'Windows_NT') {
      currentShell = 'C:\\Windows\\System32\\cmd.exe'
    } else {
      currentShell = process.env.SHELL
    }
    const currentShellName = path.basename(currentShell)
    const shells = [{ shellName: currentShellName, shellCmd: currentShell }]

    return shells
  }
}

module.exports = shell
