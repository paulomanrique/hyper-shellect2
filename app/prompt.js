const readline = require('readline')
const { spawn } = require('child_process')
const colors = require('./colors')

function clearTerm () {
  process.stdout.write('\x1B[2J\x1B[0f')
}

const prompt = {
  command: '',
  shellSet: false,
  shellArray: [],
  exit: async () => {
    const exitIf = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    clearTerm()

    exitIf.write('Would you like to switch shells or exit?\r\n')
    exitIf.write('0  switch\r\n')
    exitIf.write('1  exit\r\n')
    exitIf.write('\r\n')

    exitIf.on('line', async (line) => {
      const intLine = parseInt(line, 10)

      if (intLine === 0) {
        setShell('reset')
        exitIf.close()
      } else {
        setShell('exit')
        exitIf.close()
      }
    })

    exitIf.on('close', async () => {
      if ((await getShell()) !== '') {
        await spawnShell()
      }
    })
  },
  selectShell: async () => {
    prompt.shellArray = JSON.parse(process.env.SHELLECT_SHELLS)
    const selectIf = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    clearTerm()

    selectIf.write('Select a shell:\r\n')
    let i = 0
    for (i; i < prompt.shellArray.length; i += 1) {
      selectIf.write(await colors.random(`${i} ${prompt.shellArray[i].shellName}\r\n`))
    }
    selectIf.write(`${i} exit\r\n`)
    selectIf.write('\r\n')

    selectIf.on('line', async (line) => {
      const intLine = parseInt(line, 10)

      if (intLine !== i || intLine.isNaN) {
        if (intLine < i) {
          setShell(`${prompt.shellArray[intLine].shellCmd}`)
          selectIf.close()
        } else {
          setShell('reset')
          selectIf.close()
        }
      } else {
        setShell('exit')
        selectIf.close()
      }
    })

    selectIf.on('close', async () => {
      if (await getShell()) {
        await spawnShell()
      }
    })
  }
}

async function setShell (shellCmd) {
  prompt.shellSet = true
  prompt.command = shellCmd.toString()
}

async function resetShell () {
  prompt.shellSet = false
  prompt.command = ''
}

async function getShell () {
  return prompt.command.toString()
}

async function spawnShell () {
  const shellString = await getShell()
  let childProcess

  clearTerm()

  switch (shellString) {
    case 'reset':
      await resetShell()
      await prompt.selectShell()
      break
    case 'exit':
      process.exit()
    default:
      if (shellString.startsWith('ssh')) {
        const url = shellString.substring(4, shellString.length)
        const spawnArgs = ['-tt',
          url,
          '-o StrictHostKeyChecking=no'
        ]
        childProcess = await spawn('/usr/bin/ssh', spawnArgs, {
          stdio: [process.stdin, process.stdout, process.stderr],
          detached: false
        })
      } else {
        childProcess = await spawn(shellString, {
          stdio: [process.stdin, process.stdout, process.stderr],
          detached: false
        })
      }

      childProcess.on('close', () => {
        prompt.exit()
      })

      break
  }
}

module.exports = prompt
