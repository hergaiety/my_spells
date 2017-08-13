var
  shell = require('shelljs'),
  path = require('path')

shell.rm('-rf', path.resolve(__dirname, '../dist ../src/tmp'))
console.log(' Cleaned build artifacts.\n')
