const config = {
  parse: (config) => {
    if (!config) {
      return {}
    }
    if (!config.shellect) {
      console.log(
        "shellect: no 'config.shellect' object found in ~/.hyper.js"
      )
      return {}
    }
    if (!(config.shellect === Object(config.shellect))) {
      console.log(
        "shellect: 'config.shellect' is not an object in ~/.hyper.js"
      )
      return {}
    }
    return config.shellect
  }
}

module.exports = config
