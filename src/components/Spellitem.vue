<template>
  <tr>
    <td colspan="3">
      <q-collapsible
        :label="spell.title"
        group="spells"
      >
        {{spell.description}}
      </q-collapsible>
    </td>
  </tr>
</template>

<script>
export default {
  props: [
    'spell'
  ]
}
</script>

<style scoped lang="stylus">
</style>
