<template>
  <div class="list striped no-border">
    <label
      is="spell-item"
      class="item two-line item-link"
      v-for="spell in pagedSpells"
      :spell="spell"
    >
    </label>
  </div>
</template>

<script>
import Vue from 'vue'
import Query from '../query'
import SpellItem from './Spellitem'

Vue.component('spell-item', SpellItem)

export default {
  props: [
    'spells',
    'search'
  ],
  data () {
    return {
      perPage: 10,
      page: 1,
      sortBy: 'name'
    }
  },
  watch: {
    pageMax (newPageMax) {
      if (this.page > newPageMax) {
        this.page = newPageMax
      }
    }
  },
  computed: {
    dynamicSortBy () {
      return this.search.length >= 3 ? 'sortScore' : this.sortBy
    },
    pageMax () {
      let trueMax = this.filteredSpells.length / this.perPage
      return trueMax < 1 ? 1 : trueMax
    },
    pagedSpells () {
      return new Query(this.filteredSpells)
      .paginate(this.page, this.perPage)
      .results
    },
    filteredSpells () {
      return new Query(this.spells)
      .search('name', this.search, 5)
      .sort(this.sortBy)
      .results
    }
  }
}
</script>

<style scoped lang="stylus">
  .spell-list
    width: 100%
    th
      a
        display: inline-block
        padding: 1em 0
      &.sort-level
        padding-left: 1em
        width: 5em
      &.sort-name
        padding-left: 1em
</style>
