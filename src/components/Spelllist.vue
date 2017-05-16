<template>
  <section 
    is="q-infinite-scroll"
    :handler="loadMore"
    class="spell-list list striped no-border"
  >
    <label
      is="spell-item"
      class="item two-lines item-link"
      v-for="spell in filteredSpells"
      :spell="spell"
    >
    </label>
  </section>
</template>

<script>
import Vue from 'vue'
import Query from '../query'
import SpellItem from './Spellitem'
import { state } from '../store'

Vue.component('spell-item', SpellItem)

export default {
  data () {
    return { state }
  },
  props: [
    'spells'
  ],
  computed: {
    filteredSpells () {
      return new Query(this.spells)
      .search('name', this.state.search)
      .sort(this.state.sortBy)
      .paginate(1, this.state.loadedPagination * 20)
      .results
    }
  },
  methods: {
    loadMore (index, done) {
      this.state.loadedPagination += 1
      done()
    }
  }
}
</script>

<style lang="stylus">
.toolbar > .q-picker-textfield
  margin: 0 .75em
</style>
