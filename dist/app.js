/**
 * Misc helper functions
 */
Object.values = x => Object.keys(x).reduce((y, z) => y.push(x[z]) && y, []);
const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
const el = id => $(`[data-template=${ id }]`)[0] || console.error('Unable to render to', id);
const clone = obj => JSON.parse(JSON.stringify(obj));

/**
 * Global store and view holders
 */
let store = {};
let view = {};

/**
 * Init Local Storage
 */
const localStorageDefault = (key, val) => {
    if (localStorage.getItem(key) === null) localStorage.setItem(key, val);
};
let defaults = {
    tableSortName: 'name',
    tableSortRev: false,
    classes: [],
    search: ''
};
for (let cur in defaults) localStorageDefault(cur, defaults[cur]);

/**
 * Render Table Sort
 */
store.tableSort = {
    data: ['name', 'school', 'level'],
    current: localStorage.getItem('tableSortName'),
    rev: localStorage.getItem('tableSortRev') !== 'false'
};
view.table_sort = Monkberry.render(table_sort, el('table-sort'));
view.table_sort.update(store.tableSort);

/**
 * Render Spell List
 */
view.spell_list = Monkberry.render(spell_list, el('spell-list'));
view.spell_list.update({});

/**
 * Render Spell Details
 */
view.spell_details = Monkberry.render(spell_details, el('spell-details'));
view.spell_details.update({ data: {} });

/**
 * Render Class List
 */
store.classes = {
    data: [],
    current: localStorage.getItem('classes') ? localStorage.getItem('classes').split(',') : []
};
view.class_list = Monkberry.render(class_list, el('class-list'));
view.class_list.update(store.classes);

/**
 * Render Search
 */
store.search = localStorage.getItem('search');
view.search_field = Monkberry.render(search_field, el('search-field'));
view.search_field.update({ data: store.search });

/**
 * Discover Classes
 */
const discoverClasses = spells => {
    let classes = [];
    spells.forEach(spell => {
        if (!spell.classes) return;
        spell.classes.forEach(current => {
            if (!classes.includes(current)) classes.push(current);
        });
    });
    return classes.sort((a, b) => a > b);
};

/**
 * Emphasis on important string bits
 * @param {string} string
 */
const emphasis = str => {
    let keywords = ['constitution', 'con', 'intelligence', 'int', 'wisdom', 'wis', 'strength', 'str', 'dexterity', 'dex', 'charisma', 'cha', 'comeliness', 'com', 'saving throw', 'ability check', 'skill check'];
    keywords.forEach(word => {
        let r = new RegExp(` ${ word } `, 'gi');
        str = str.replace(r, o => ` _${ o.trim() }_ `);
    });

    str = str.replace(/[\s()<>]+\d+d*\d*(th)*[\s()<>]+/gi, o => ` **${ o.trim() }** `);
    return str;
};

/**
 * Init Spells
 */
const initSpells = s => s.map((spell, i) => {
    spell.selected = false;
    spell.ranking = 0;
    spell.level = parseInt(spell.level) ? spell.level : 0;
    spell.prettyLevel = spell.level === 0 ? 'C' : spell.level;
    return spell;
});

/**
 * Sort Spells
 */
const sortSpells = (s, sortBy, reverse) => s.sort((a, b) => {
    let hasFilters = store.classes.current.length || store.search.length;
    let by = sortBy || hasFilters ? 'ranking' : store.tableSort.current;
    let rev = reverse || hasFilters ? false : store.tableSort.rev;
    if (by) {
        if (a[by] < b[by]) return rev ? 1 : -1;
        if (a[by] > b[by]) return rev ? -1 : 1;
        return 0;
    }
});

/**
 * Search Spells
 * @param {Array} spells
 * @param {String} ex 'acid spray'
 * @return {Array} filtered spells
 */
const searchSpells = (spells, search) => {
    // Convert search to array of words
    search = search.split(' ');
    // Clone spells so we don't affect the original
    spells = clone(spells);
    // Reset rankings
    spells = spells.map(s => {
        s.ranking = 0;
        return s;
    });
    // Rank spells by # of occurances of search terms
    spells = spells.map(spell => {
        search.forEach(term => {
            let spellText = Object.values(spell).join(' ');
            let regFind = new RegExp(term, 'gi');
            spell.ranking += (spellText.match(regFind) || []).length;
        });
        return spell;
    });
    // Return spells that matched at least something
    return spells.filter(spell => spell.ranking);
};

/**
 * Filter Spells by Class
 */
const filterSpellsByClass = (spells, classes) => {
    // If no classes, default to all classes
    classes = classes.length ? classes : store.classes.data;
    // Clone spells so we don't affect the original
    spells = clone(spells);
    return spells.filter(spell => {
        let spellClasses = spell.classes.join(' ');
        let match = false;
        classes.forEach(c => {
            if (spellClasses.indexOf(c) >= 0) {
                match = true;
                return true;
            }
        });
        return match;
    });
};

/**
 * Apply Filters
 * @returns {Array} of spells ranked based on searches and filters
 */
let applyFilters = () => sortSpells(searchSpells(filterSpellsByClass(store.spells, store.classes.current), store.search));

/**
 * Spell Details Updating
 */
const spellDetails = name => {
    if (!name) {
        view.spell_details.update({ data: {} });
        $('body').removeClass('details');
    } else {
        let data = clone(store.spells.find(spell => name === spell.name));
        let md = new Remarkable();
        data.description = Array.isArray(data.description) ? data.description.join('\n') : data.description;
        data.description = emphasis(data.description);
        data.description = md.render(data.description);
        data.description = data.description.replace(/\n/g, '<br>');

        view.spell_details.update({
            data,
            url: window.location.href
        });
        $('body').addClass('details');
        let clipboard = new Clipboard('.copy-to-clipboard');
        clipboard.on('success', e => $('#toast')[0].MaterialSnackbar.showSnackbar({ message: 'Copied link' })).on('error', e => $('#toast')[0].MaterialSnackbar.showSnackbar({ message: 'Sorry! Unable to copy link' }));
    }
};
/**
 * Event Bindings
 */
$('body')
// Listen for header sorts
.on('click', '[data-action-sort]', e => {
    let name = $(e.currentTarget).attr('data-action-sort');
    let rev = store.tableSort.current === name && !store.tableSort.rev;
    store.tableSort.current = name;
    store.tableSort.rev = rev;
    localStorage.setItem('tableSortName', name);
    localStorage.setItem('tableSortRev', rev);
    view.spell_list.update({ data: sortSpells(store.spells) });
    view.table_sort.update(store.tableSort);
})
// Listen for checkbox changes to filter spells
.on('change', '[data-action-classtoggle]', e => {
    let name = $(e.currentTarget).attr('data-action-classtoggle');
    let add = $(e.currentTarget).prop('checked');
    let index = store.classes.current.indexOf(name);
    if (index === -1 && add) {
        store.classes.current.push(name);
    } else if (!add) store.classes.current.splice(index, 1);
    store.tableSort.current = store.classes.current.length || store.search.length ? 'ranking' : null;
    localStorage.setItem('tableSortName', store.tableSort.current);
    localStorage.setItem('classes', store.classes.current);
    view.spell_list.update({ data: applyFilters() });
    view.table_sort.update({ current: store.tableSort.current });
})
// Listen to search to filter by
.on('change keyup cut paste', '[data-action-search]', e => {
    setTimeout(() => {
        // Delay for value to change
        store.search = $(e.currentTarget).val();
        store.tableSort.current = store.search.length || store.classes.current.length ? 'ranking' : null;
        store.tableSort.rev = false;
        localStorage.setItem('search', store.search);
        localStorage.setItem('tableSortName', store.tableSort.current);
        localStorage.setItem('tableSortRev', store.tableSort.rev);
        view.spell_list.update({ data: applyFilters() });
        view.table_sort.update(store.tableSort);
    }, 0);
})
// Listen for click on spells to open details
.on('click', '[data-action-details]', e => {
    let name = $(e.currentTarget).attr('data-action-details');
    window.location.hash = name;
    spellDetails(name);
})
// Stop propogation if dontprop clicked
.on('click', '.dontprop', e => {
    e.stopPropagation();
})
// Toggle All
.on('change', 'label[for=table-header] input[type=checkbox]', e => {
    $(e.target).closest('form').find('[name=selected]').each(function () {
        this.checked = e.target.checked;
        if (this.checked) $(this).closest('label').addClass('is-checked');else $(this).closest('label').removeClass('is-checked');
    });
}).on('change', 'input[name=selected][type=checkbox]', e => {
    console.log($('form[data-selected]').serialize());
})
// Article Scroll with User
.on('scroll', '.mdl-layout__content', debounce(() => {
    let distance = $('.mdl-layout__content')[0].scrollTop;
    $('[data-template=spell-details]').css('margin-top', distance);
}, 10));

/**
 * Fetch Spells
 */
fetch('./spells.json').then(response => response.json()).then(spells => initSpells(spells)).then(spells => {
    store.spells = spells;
    store.classes.data = discoverClasses(spells);
    view.spell_list.update({ data: applyFilters() });
    view.class_list.update(store.classes);
    if (window.location.hash) spellDetails(window.location.hash.substr(1));
}).catch(reason => console.error('Unable to retrieve spells list:', reason));
