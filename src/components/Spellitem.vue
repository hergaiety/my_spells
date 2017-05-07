<template>
  <q-collapsible :label="spell.title" group="spells">
    {{spell.description}}
  </q-collapsible>
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
