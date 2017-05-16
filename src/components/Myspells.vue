<template>
  <main>
    <spell-list
      v-if="mySpells.length"
      :spells="mySpells"
    ></spell-list>
  </main>
</template>

<script>
import Vue from 'vue'
import SpellList from './Spelllist'
import { state } from '../store'

Vue.component('spell-list', SpellList)

export default {
  data () {
    return { state }
  },
  computed: {
    mySpells () {
      if (!this.state.spells.loaded || this.state.chosen.length === 0) {
        return []
      }

      return this.state.chosen.map(chosen => {
        return this.state.spells.data.find(spell => {
          return spell.name === chosen
        })
      })
    }
  }
}
</script>
