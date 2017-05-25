<template>
  <div>
    <q-toolbar-title :padding="0">
      <img class="logo" src="statics/logo.svg" alt="" />
      My Spells
      <small>5e Personal Spellbook</small>
    </q-toolbar-title>

    <router-link
      to="/about"
      tag="button"
    >
      <i>build</i>
      <q-tooltip
        anchor="bottom right"
        self="top right"
      >
        About
      </q-tooltip>
    </router-link>
  </div>
</template>

<script>
import { state } from '../store'

export default {
  data () {
    return {
      state
    }
  }
}
</script>

<style scoped lang="stylus">
  .logo
    height: 1.25em
    vertical-align: middle
</style>
