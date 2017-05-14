<template>
  <div>
    <div class="item-primary">
      {{level}}
    </div>
    <div class="item-content has-secondary" v-on:click="openSpell">
      <div>
        {{spell.name}}
      </div>
      <div>
        {{classes}}
      </div>
    </div>
    <div class="item-secondary">
      <q-checkbox
        v-model="checked"
        @input="toggle"
      ></q-checkbox>
    </div>
  </div>
</template>

<script>
import { state, dispatch } from '../store'

let capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default {
  computed: {
    level () {
      return this.spell.level.toLowerCase() === 'cantrip' ? '0' : this.spell.level.charAt(0)
    },
    school () {
      return capitalize(this.spell.school)
    },
    classes () {
      return this.spell.classes.map(cla => capitalize(cla)).join(', ')
    }
  },
  data () {
    return {
      checked: false
    }
  },
  props: [
    'spell'
  ],
  methods: {
    openSpell (event) {
      console.log(this.spell.name)
    },
    toggle (want) {
      dispatch({
        type: 'CHANGE_CHOSEN',
        data: {
          want,
          name: this.spell.name
        }
      })
      console.log(state.chosen)
    }
  }
}
</script>
