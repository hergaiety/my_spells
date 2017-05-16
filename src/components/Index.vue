<template>
  <main>
    <spell-list
      :spells="state.spells.data"
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
  }
}
</script>
