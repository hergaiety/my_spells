'use strict';

let newSpells = [];
let spells = require('./spells.json');
//spells.forEach(spell => {
    //if (spell.tags) {
        //spell.classes = [];
        //spell.tags.forEach(tag => {
            //let classes = ['cleric', 'fighter', 'rogue', 'wizard', 'barbarian', 'bard', 'druid', 'monk', 'paladin', 'ranger', 'sorcerer', 'warlock'];
            //classes.forEach(x => {
                //if (tag.indexOf(x) > -1) spell.classes.push(x);
            //});
        //});
    //}
    //newSpells.push(spell);
//});

require('fs').writeFileSync('./newSpells.json', JSON.stringify(newSpells));
