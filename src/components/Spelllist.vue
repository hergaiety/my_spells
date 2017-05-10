<template>
  <table class="spell-list q-table compact striped-odd">
    <thead>
      <tr>
        <td colspan="3">
          <q-pagination
            v-model="page"
            :max="pageMax"
          ></q-pagination>
        </td>
      </tr>
      <tr>
        <th class="text-left no-padding">
          <a class="sort-name"
            v-on:click="sortBy = 'name'"
          >Name</a>
        </th>
        <th class="text-left no-padding">
          <a class="sort-school"
            v-on:click="sortBy = 'school'"
          >School</a>
        </th>
        <th class="text-right no-padding">
          <a class="sort-level"
            v-on:click="sortBy = 'level'"
          >Level</a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        is="spell-item"
        v-for="spell in pagedSpells"
        :spell="spell"
      >
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">
          <q-pagination
            v-model="page"
            :max="pageMax"
          ></q-pagination>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import Vue from 'vue'
import Query from '../query'
import SpellItem from './Spellitem'

Vue.component('spell-item', SpellItem)

export default {
  computed: {
    pageMax () {
      let trueMax = this.spells.length / this.perPage
      return trueMax < 1 ? 1 : trueMax
    },
    pagedSpells () {
      return new Query(this.sortedSpells)
      .paginate(this.page, this.perPage)
    },
    sortedSpells () {
      return this.spells
      // return new Query(this.spells)
      // .sort(this.sortBy)
      // .results
    }
  },
  watch: {
    pageMax (newPageMax) {
      if (this.page > newPageMax) {
        this.page = newPageMax
      }
    }
  },
  props: [
    'spells'
  ],
  data () {
    return {
      perPage: 10,
      page: 1,
      sortBy: 'name'
    }
  }
}
</script>

<style scoped lang="stylus">
  .spell-list
    width: 100%
  th a
    display: inline-block
    padding: 1em 0
    &.sort-name
      margin-left: 1em
      margin-right: -1em
    &.sort-level
      margin-left: -5em
      margin-right: 5em
</style>
