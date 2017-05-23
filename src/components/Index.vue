<template>
  <main>
    <spell-list
      v-if="state.spells.data.length"
      :spells="state.spells.data"
    ></spell-list>
    <page-empty
      v-else
      title="Writing Spellbook..."
    >
      Please wait...
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
  }
}
</script>

<style scoped lang="stylus">
  main
    height: 90%
</style>
