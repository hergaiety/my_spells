<template>
  <main>
    <spell-list
      v-if="mySpells.length"
      :spells="mySpells"
    ></spell-list>
    <page-empty
      v-else
      title="You haven't chosen any spells"
    >
      Try <span class="text-pink"><i>bookmark</i> Bookmarking</span> spells from the
      <router-link to="/">all spells page</router-link> to add to your spellbook.
    </page-empty>
  </main>
</template>

<script>
import Vue from 'vue'
import Empty from './Empty'
import SpellList from './Spelllist'
import { state } from '../store'

Vue.component('page-empty', Empty)
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
        return this.state.indexedSpells.find(spell => {
          return spell.id === chosen
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  main
    height: 90%
</style>
