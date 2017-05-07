<template>
  <table class="list">
    <tr
      is="spell-item"
      v-for="spell in spells"
      :spell="spell"
    >
    </tr>
  </table>
</template>

<script>
import Vue from 'vue'
import SpellItem from './Spellitem'

Vue.component('spell-item', SpellItem)

export default {
  data () {
    return {
      spells: [
        {
          title: 'example 1',
          description: 'foo'
        }, {
          title: 'example 2',
          description: 'bar'
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
  .list
    width: 100%
</style>
