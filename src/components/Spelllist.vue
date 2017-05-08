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
    </thead>
    <tbody>
      <tr
        is="spell-item"
        v-for="spell in spells"
        :spell="spell"
      >
      </tr>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'
import SpellItem from './Spellitem'

Vue.component('spell-item', SpellItem)

export default {
  props: [
    'spells'
  ]
}
</script>

<style scoped lang="stylus">
  .spell-list
    width: 100%
</style>
