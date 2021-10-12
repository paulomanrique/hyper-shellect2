# hyper-shellect2

hyper-shellect2 is a small hyper plugin that lets you configure a menu of multiple shells or SSH hosts, that you can select from and switch between.

You can add and remove as many shells as your little heart desires, they're all stored in your `.hyper.js`

## Preview

![hyper-shellect preview gif](hyper-shellect.gif)

## Install
1. Run `hyper i hyper-shellect2` or manually add `hyper-shellect2` to your hyper plugins.
2. Add the shellect config to .hyper.js:
    ```
    shellect: {
      colorsEnabled: true,
      shells: [
        {
          shellName: 'zsh',
          shellCmd: '/bin/zsh'
        },
        {
          shellName: 'My Webhosting',
          shellCmd: 'ssh my.domain.com'
        },
        {
          shellName: 'node',
          shellCmd: '/usr/local/bin/node'
        },
        {
          shellName: 'python',
          shellCmd: '/usr/bin/python'
        },
      ]
    },
    ```
3. Away you go!

## Adding a shell

1. Open your `.hyper.js` configuration file
2. Add a new object to `shellect.shells` with the shellName (a meaningful label) and the full `shellCmd` text for the shell:
    - `{ shellName: 'python', shellCmd: '/usr/bin/python' }`
    - if the command is on your PATH, you may be able to simply use the command name instead of the full path
3. Re-run the script, and the new shell will be available!

## Running Out of Hyper

The project can also be utilized outside of Hyper, if you just want a simple terminal switcher.

1. `git clone https://github.com/paulomanrique/hyper-shellect2` or `npm i hyper-shellect2` wherever you'd like the tool installed
2. Create a `.env.json` file in the root of the installed project with the same shellect configuration object as used by Hyper
3. Run `npm start` from the root or `node /path/to/run.js` from anywhere
4. Be content!

## This is a recovered project

This project was originally on this repo https://github.com/joskore/hyper-shellect, but it got deleted since.

I recovered the project and added an option to add SSH hosts. Feel free to contribute or suggest more changes.