'use strict'

const args = require('yargs').argv

const fs = require('fs')
const spells = require('../src/spells_original.json')

const hashCode = function (str) {
  let hash = 0, i, chr
  if (str.length === 0) return hash
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return hash
}

console.log('Processing spells...', args.web ? 'for web!' : 'for apps!')

let spellsWithIDs = spells.map(spell => {
  spell.id = hashCode(spell.name).toString()
  return spell
})

let indexedSpells = spellsWithIDs.map(spell => {
  return {
    id: spell.id,
    name: spell.name,
    classes: spell.classes,
    level: spell.level.toLowerCase() === 'cantrip' ? 0 : parseInt(spell.level),
    link: '/spell/' + spell.id,
  }
})

let dirs = ['dist', 'dist/statics', 'src/tmp']
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
})

fs.writeFileSync('./src/tmp/spells_index.js', `export default ${JSON.stringify(indexedSpells)};`)

if (args.web) {
  fs.writeFileSync('./dist/statics/spells.json', JSON.stringify(spellsWithIDs));
  fs.writeFileSync('./src/tmp/spells.js', `export default []; // Will fetch from web`)
}
else {
  fs.writeFileSync('./src/tmp/spells.js', `export default ${JSON.stringify(spellsWithIDs)};`)
}

console.log('Processed spells')
