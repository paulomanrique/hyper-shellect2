const colors = require('colors')

const color = {
  colorName: ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'],
  colorFunc: {
    red: (string) => colors.red(string),
    green: (string) => colors.green(string),
    yellow: (string) => colors.yellow(string),
    blue: (string) => colors.blue(string),
    magenta: (string) => colors.magenta(string),
    cyan: (string) => colors.cyan(string)
  },
  random: async (string) => {
    const selectedColor = color.colorName[Math.floor(Math.random() * color.colorName.length)]
    return process.env.SHELLECT_COLORS
      ? color.colorFunc[selectedColor](string)
      : string
  }
}

module.exports = color
