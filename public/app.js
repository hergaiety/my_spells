/**
 * Capitalize Helper
 **/
let capitalize = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

/**
 * Tooltip Counter
 */
let tooltipCount = 1;
let tooltipCounter = () => tooltipCount++;

/**
 * Discover Classes
 */
const DISCOVERCLASSES = spells => {
    let classes = [];
    spells.forEach(spell => {
        if (!spell.classes) return;
        spell.classes.forEach(current => {
            if (!classes.includes(current)) classes.push(current);
        });
    });
    classes = classes.sort((a, b) => a > b);
    return {spells, classes}
};

/**
 * Dom Helper
 */
const DOMHELPER = {
    emphasis (str) {
        let keywords = ['intelligence', 'int', 'wisdom', 'wis', 'strength', 'str', 'dexterity', 'dex', 'charisma', 'cha', 'comeliness', 'com', 'saving throw', 'ability check', 'skill check'];
        keywords.forEach(word => {
            let r = new RegExp(` ${word} `, 'gi');
            str = str.replace(r, o => `<em class="mdl-color-text--teal-600">${o}</em>`);
        });

        str = str.replace(/[\s()<>]+\d+d*\d*(th)*[\s()<>]+/gi, o => `<strong>${o}</strong>`);
        return str;
    },
    level (lvl) {
        let cantrip = lvl.toLowerCase() === 'cantrip';
        let invalid = isNaN(lvl) && !cantrip;
        if (invalid) return '?';
        else return cantrip ? 'C' : lvl;
    },
    components (components) {
        let dom = '';
        let types = ['verbal', 'somatic', 'material'];
        let typesDescriptions = [
            'Spoken word/prayer. Mouth must be free and not mute.',
            'Physical gestures, usually hand movements. Must not be bound.',
            'Items consumed upon casting spell.'
        ];

        types.forEach((type, i) => {
            if (!!components[type]) {
                let currentTooltip = tooltipCounter();
                dom += `
                    <li class="left has-tooltip" id="tooltip-${currentTooltip}">${types[i].charAt(0).toUpperCase()}</li>
                    <label class="mdl-tooltip" for="tooltip-${currentTooltip}">
                        <strong>${capitalize(type)}</strong><br />
                        ${typesDescriptions[i]}
                    </label>
                `;
            }
        });
        return dom;
    },
    classes (classes) {
        let dom = '';
        classes.forEach(x => {
            dom += `<a>${capitalize(x)}</a>&nbsp;`;
        });
        return dom;
    }
};

/**
 * List of Selected Spells
 */
const SELECTEDSPELLS = () => $('#form-spells').serializeArray().map(spell => parseInt(spell.value));

/**
 * Add Spells to Page
 */
const RENDERSPELLS = (x) => {
    let dom = '';
    let spells = x ? x.spells.slice(0) : data;
    spells = CLASSSPELLS(spells);
    spells = SEARCHSPELLS(spells);
    spells = spells.sort((a, b) => b.ranking - a.ranking);
    spells.forEach(spell => {
        let el = $('#spell-item').html();
        let $el = $(el);

        $('[data-id-spellitem=level]', $el)[0].innerHTML
            = DOMHELPER.level(spell.level);
        $('[data-id-spellitem=name]', $el)[0].innerHTML
            = spell.name;
        $('[data-id-spellitem=school]', $el)[0].innerHTML
            = capitalize(spell.school);
        $('[data-id-spellitem=checkbox]', $el).attr('value', spell.id).attr('id', `sel-${spell.id}`);
        $('[data-id-spellitem=checklabel]', $el).attr('for', `sel-${spell.id}`);
        $el.attr('data-action-dialog', spell.id);

        dom += $el.prop('outerHTML');
    });
    $('#spell-list').html(dom);
    componentHandler.upgradeDom();
    return data;
};

/**
 * Render Spell Details to Dialog
 */
const RENDERSPELLDIALOG = spell => {
    let el = $('#spell-detail').html();
    let $el = $(`<div>${el}</div>`);

    $('[data-id-spelldetail=name]', $el)[0].innerHTML
        = spell.name;
    $('[data-action-select]', $el).attr('data-action-select', spell.id);
    $('[data-action-select] input[type="checkbox"]', $el).attr('checked', SELECTEDSPELLS().includes(spell.id));
    if (spell.description) {
        $('[data-id-spelldetail=description]', $el)[0].innerHTML
            = DOMHELPER.emphasis(spell.description);
    }
    if (spell.tags) {
        $('[data-id-spelldetail=classes]', $el)[0].innerHTML
            = DOMHELPER.classes(spell.classes);
    }
    if (spell.components) {
        $('[data-id-spelldetail=components]', $el)[0].innerHTML
            = DOMHELPER.components(spell.components);
    }
    if (spell.components.materials_needed) {
        $('[data-id-spelldetail=materials]', $el)[0].innerHTML
            = spell.components.materials_needed.join(', ');
    }
    if (spell.level) {
        $('[data-id-spelldetail=level]', $el)[0].innerHTML
            = 'Level ' + spell.level;
    }
    if (spell.duration) {
        $('[data-id-spelldetail=duration]', $el)[0].innerHTML
            = spell.duration;
    }
    if (spell.casting_time) {
        $('[data-id-spelldetail=castingtime]', $el)[0].innerHTML
            = spell.casting_time;
    }
    if (spell.range) {
        $('[data-id-spelldetail=range]', $el)[0].innerHTML
            = spell.range;
    }

    $('#spell-detail-container').html($el.prop('outerHTML'));
    componentHandler.upgradeDom();
};


/**
 * Fetch Classes from Spells
 */
const RENDERCLASSES = data => {
    let dom = '';
    data.classes.forEach(item => {
        let el = $('#class-toggle').html();
        let $el = $(el);

        $('[data-action-classtoggle]', $el).attr('value', item);
        $('[data-id-classtoggle=name]', $el)[0].innerHTML = item;
        dom += $el.prop('outerHTML');
    });
    $('#class-list').html(dom);

    return data;
};

const SEARCHSPELLS = (spells, search = $('[data-action-search]').val()) => {
    search = search.toLowerCase();
    if (search.length >= 3) {
        spells = spells.filter(spell => {
            let regFind = new RegExp(search, 'gi');
            let spellName = spell.name.toLowerCase();
            let spellDescription = spell.description ? spell.description.toLowerCase() : '';
            let spellMaterials = spell.components && spell.components.materials_needed || [];

            let matches = 0
                + spellName.indexOf(search) > -1 ? 20 : 0
                + (spellDescription.match(regFind) || []).length
                + (spellMaterials).filter(com => com.indexOf(search) > -1).length * 10;

            spell.ranking = matches;
            return spell.ranking > 0;
        });
    }
    return spells;
};

const CLASSSPELLS = (spells, classes) => {
    classes = classes || $('#class-list').serializeArray().map(x => x.value);
    return classes.length ? spells.filter(spell => {
        for(let i = 0; i < classes.length; i++) {
            if (spell.classes.indexOf(classes[i]) >= 0) return true;
        }
    }) : spells;
};

/**
 * Retrieve Spells
 */
let data;

fetch('./spells.json')
    .then(response => response.json())
    .then(spells => spells.map((spell, i) => {
        spell.id = i;
        spell.ranking = 0; // Default to equal ranking
        return spell;
    }))
    .then(spells => data = spells)
    .then(spells => DISCOVERCLASSES(spells))
    .then(data => RENDERCLASSES(data))
    .then(data => RENDERSPELLS(data))
    .catch(reason => console.error('Unable to retrieve spells list:', reason));

/**
 * Details Popup
 */
let $dialog = $('dialog');

if (!$dialog[0].showModal) {
    dialogPolyfill.registerDialog($dialog);
}

$('#spell-list').on('click', '[data-action-dialog]', e => {
    let id = $(e.target).closest('tr').data('action-dialog');
    RENDERSPELLDIALOG(data[id]);
    $dialog[0].showModal();
}).on('click', '.dontprop', e => {
    e.stopPropagation();
});

$dialog.on('click', '[data-action-close]', () => {
    $dialog[0].close();
});

/**
 * Bind Checkbox Selection Action
 */
$('body').on('change', '[data-action-select] input', e => {
    let id = $(e.target).closest('label').attr('data-action-select');
    if (id) $('#sel-' + id).click();
});

/**
 * Bind Toggle All Checkbox
 */
$('label[for=table-header]').on('change', 'input[type="checkbox"]', e => {
    $(e.target).closest('form').find('[data-id-spellitem=checkbox]').each(function() {
        this.checked = e.target.checked;
        if(this.checked) $(this).closest('label').addClass('is-checked');
        else $(this).closest('label').removeClass('is-checked');
    })
});

/**
 * Bind Class Filter Switches
 */
$('body').on('change', '[data-action-classtoggle]', e => {
    RENDERSPELLS();
});

/**
 * Search
 */
$('body').on('change keyup cut paste', '[data-action-search]', e => {
    setTimeout(function() {
        RENDERSPELLS();
    }, 0);
});
