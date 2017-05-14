export let state = {
  spells: {
    loaded: false,
    data: []
  },
  chosen: []
}

export function dispatch (action) {
  switch (action.type) {
    case 'SPELLS_RESOLVED':
      state.spells = action.data
      break
    case 'CHANGE_CHOSEN':
      if (action.data.want) {
        state.chosen.push(action.data.name)
      }
      else {
        let index = state.chosen.indexOf(action.data.name)
        if (index >= 0) state.chosen.splice(index, 1)
      }
      break
  }
}

export default {
  state,
  dispatch
}
