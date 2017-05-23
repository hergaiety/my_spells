<template>
  <div class="empty text-center">
    <h1>
      {{title}}
    </h1>
    <p>
      <slot>
        This page is empty.
      </slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: [
    'title'
  ]
}
</script>

<style scoped lang="stylus">
  .empty
    height: 100%
    background-image: url('/statics/wand.svg')
    background-repeat: no-repeat
    background-position: top center
</style>
