<template>
  <table class="spell-list q-table compact striped-odd">
    <thead>
      <tr>
        <th class="text-left">
          <big>Name</big>
        </th>
        <th class="text-left">
          <big>School</big>
        </th>
        <th class="text-right">
          <big>Level</big>
        </th>
      </tr>
      <tr>
        <td colspan="3">
          <q-pagination
            v-model="page"
            :max="pageMax"
          ></q-pagination>
        </td>
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
import SpellItem from './Spellitem'

Vue.component('spell-item', SpellItem)

export default {
  computed: {
    pageMax () {
      let trueMax = this.spells.length / this.perPage
      return trueMax < 1 ? 1 : trueMax
    },
    pagedSpells () {
      let min = this.page * this.perPage - this.perPage
      let max = min + this.perPage
      return this.spells.slice(min, max)
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
      page: 1
    }
  }
}
</script>

<style scoped lang="stylus">
  .spell-list
    width: 100%
</style>
