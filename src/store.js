export let state = {
  spells: {
    loaded: false,
    data: []
  }
}

export function dispatch (action) {
  switch (action.type) {
    case 'SPELLS_RESOLVED':
      state.spells = action.data
      break
  }
}

export default {
  state,
  dispatch
}
