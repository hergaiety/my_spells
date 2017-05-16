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
    filteredSpells () {
      return new Query(this.spells)
      .search('name', this.search)
      .sort(this.sortBy)
      .paginate(1, this.loadedPage * 20)
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
