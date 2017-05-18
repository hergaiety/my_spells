<template>
  <section class="spell-list list striped no-border" id="spell_list">
    <label
      is="spell-item"
      class="item two-lines item-link"
      v-for="spell in pagedSpells"
      :spell="spell"
    >
    </label>
    <q-pagination
      class="text-center"
      v-model="state.page"
      :max="numPages"
    ></q-pagination>
  </section>
</template>

<script>
import Vue from 'vue'
import { Utils } from 'quasar'
import Query from '../query'
import SpellItem from './Spellitem'
import { state } from '../store'

Vue.component('spell-item', SpellItem)

export default {
  data () {
    return {
      state,
      perPage: 0
    }
  },
  props: [
    'spells'
  ],
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.newPerPage)
    })
    this.calculateNewPage()
  },
  methods: {
    newPerPage: Utils.debounce(function () {
      this.calculateNewPage()
    }, 100),
    calculateNewPage () {
      let fontSize = 14
      this.perPage = Math.floor(window.innerHeight / (fontSize * 5)) - 4
    }
  },
  computed: {
    numPages () {
      return Math.ceil(this.filteredSpells.length / this.perPage)
    },
    filteredSpells () {
      return new Query(this.spells)
      .search('name', this.state.search)
      .sort(this.state.sortBy)
      .results
    },
    pagedSpells () {
      return new Query(this.filteredSpells)
      .paginate(this.state.page, this.perPage)
      .results
    }
  }
}
</script>

<style lang="stylus">
.toolbar > .q-picker-textfield
  margin: 0 .75em
</style>
