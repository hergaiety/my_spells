<template>
  <section 
    is="q-infinite-scroll"
    :handler="loadMore"
    class="spell-list list striped no-border"
  >
    <label
      is="spell-item"
      class="item two-lines item-link"
      v-for="spell in pagedSpells"
      :spell="spell"
    >
    </label>
  </section>
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
      loadedPage: 1,
      sortBy: 'name'
    }
  },
  computed: {
    dynamicSortBy () {
      return this.search.length >= 3 ? 'sortScore' : this.sortBy
    },
    pagedSpells () {
      debugger
      return new Query(this.filteredSpells)
      .paginate(1, this.loadedPage * 20)
      .results
    },
    filteredSpells () {
      return new Query(this.spells)
      .search('name', this.search, 5)
      .sort(this.sortBy)
      .results
    }
  },
  methods: {
    loadMore (index, done) {
      this.loadedPage += 1
      done()
    }
  },
  watch: {
    search () {
      this.loadedPage = 1
    }
  }
}
</script>
