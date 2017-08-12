<template>
  <footer>
    <q-tabs
      class="pink justified"
      :refs="$refs"
      default-tab="tab-all"
    >
      <q-tab
        icon="local_library"
        route="/"
        exact
      >
        All Spells
      </q-tab>
      <q-tab
        icon="bookmark"
        route="/my"
        exact
      >
        My Spells
        <span
          class="label pointing-left bg-yellow text-dark"
          v-show="state.chosen.length"
        >{{state.chosen.length}}</span>
      </q-tab>
      <q-tab
        hidden="true"
        route="/spell"
      >
        Spell
      </q-tab>
      <q-tab
        hidden="true"
        route="/about"
      >
        About
      </q-tab>
    </q-tabs>
  </footer>
</template>

<script>
import { state } from '../store'

export default {
  data () {
    return { state }
  }
}
</script>

<style scoped lang="stylus">
  footer .q-tabs
    width: 100%
    .pointing-left:before
        transform: translateX(-50%) translateY(-50%) rotate(225deg)
</style>
