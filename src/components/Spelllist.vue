<template>
  <div class="spell-list-container">
    <nav-filter></nav-filter>
    <section
      class="spell-list list striped no-border"
      id="spell_list"
    >
      <label
        is="spell-item"
        class="item two-lines item-link"
        v-for="spell in filteredSpells"
        :key="spell.name"
        :ref="spell.name"
        :spell="spell"
      >
      </label>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Query from 'json-query-chain'
import Filter from './Filter'
import SpellItem from './Spellitem'
import { state } from '../store'

Vue.component('nav-filter', Filter)
Vue.component('spell-item', SpellItem)

export default {
  data () {
    return { state }
  },
  props: [ 'spells' ],
  mounted () {
    let lastSpellPosition = this.$refs[this.state.lastSpell][0].$el.offsetTop
    let scrollingPageElement = document.getElementsByClassName('layout-view')[0]
    scrollingPageElement.scrollTo(0, lastSpellPosition)
  },
  computed: {
    filteredSpells () {
      let spells = this.spells
      return new Query(spells)
      .search('name', this.state.search)
      .sort(this.state.sortBy)
      .results
    }
  }
}
</script>

<style lang="stylus">
  .list.striped .item:nth-child(2n).checked
    background: #fff9c4
  .list.striped .item:nth-child(2n+1).checked
    background: #fffde7
</style>
