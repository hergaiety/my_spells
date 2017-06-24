var
  shell = require('shelljs'),
  path = require('path')

shell.rm('-rf', path.resolve(__dirname, '../dist ../tmp'))
console.log(' Cleaned build artifacts.\n')
