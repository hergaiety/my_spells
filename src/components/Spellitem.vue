<template>
  <tr class="spell">
    <td class="spell-level">
      {{level}}
    </td>
    <td colspan="2" class="spell-label">
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
      return this.schoolCapitalized + '\n' + this.spell.name
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
  .spell
    .item-content
        position: relative
        & > *
          white-space: pre-line !important
          overflow: visible !important
          line-height: 0
          padding-top: .5em
          text-indent: 55%
    .spell-level
      padding-left: 1em !important
</style>
