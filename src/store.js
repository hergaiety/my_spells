import { LocalStorage } from 'quasar'

export let state = {
  spells: {
    loaded: false,
    data: []
  },
  indexedSpells: [],
  chosen: [],
  search: '',
  sortBy: 'name',
  previousSortBy: 'name',
  lastSpell: ''
}

export function dispatch (action) {
  switch (action.type) {
    case 'SPELLS_RESOLVED':
      state.spells = action.data
      break
    case 'SPELLS_CREATE_INDEX':
      state.indexedSpells = action.data.map(spell => {
        return {
          name: spell.name,
          classes: spell.classes,
          level: spell.level
        }
      })
      break
    case 'LOAD_LOCAL_CHOSEN' :
      state.chosen = LocalStorage.get.item('chosen').split(',')
      break
    case 'WIPE_CHOSEN':
      state.chosen = []
      LocalStorage.remove('chosen')
      break
    case 'CHANGE_CHOSEN':
      if (action.data.want) {
        state.chosen.push(action.data.name)
      }
      else {
        let index = state.chosen.indexOf(action.data.name)
        if (index >= 0) state.chosen.splice(index, 1)
      }

      if (state.chosen.length) {
        LocalStorage.set('chosen', state.chosen.join(','))
      }
      else {
        LocalStorage.remove('chosen')
      }
      break
    case 'SEARCH_CHANGED':
      state.page = 1
      break
  }
}

export default { state, dispatch }
