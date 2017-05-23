<template>
  <main>
    <spell-list
      v-if="mySpells.length"
      :spells="mySpells"
    ></spell-list>
    <div
      class="empty text-center"
      v-else
    >
      <h1>
        You haven't chosen any spells
      </h1>
      <p>
        You must <i>bookmark</i> bookmark spells from the <router-link to="/">All Spells</router-link> page.
      </p>
    </div>
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

<style scoped lang="stylus">
  main
    height: 90%
    background-image: url('/statics/wand.svg')
    background-repeat: no-repeat
    background-position: top center
</style>
