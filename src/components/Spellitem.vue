<template>
  <tr>
    <td colspan="3" class="spell">
      <q-collapsible
        group="spells"
        :label="label"
      >

        <p>{{spell.description}}</p>
      </q-collapsible>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    level () {
      return this.spell.level.toLowerCase() === 'cantrip' ? '0' : this.spell.level.charAt(0)
    },
    label () {
      return this.level + this.schoolCapitalized + '\n' + this.spell.name
    },
    schoolCapitalized () {
      return this.spell.school.charAt(0).toUpperCase() + this.spell.school.slice(1)
    }
  },
  props: [
    'spell'
  ]
}
</script>

<style lang="stylus">
  .spell .item-content
    position: relative
  .spell .item-content > *
    white-space: pre-line !important
    overflow: visible !important
    line-height: 0
    padding-top: .5em
    text-indent: 33.333%
    &::first-letter
      margin-right: 2em
      float: right
</style>
