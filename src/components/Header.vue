<template>
  <div>
    <q-toolbar-title :padding="0">
      <img class="logo" src="statics/logo.svg" alt="" />
      My Spells
      <small>5e Personal Spellbook</small>
    </q-toolbar-title>

    <button v-on:click="copy">
      <i>file_download</i>
      <q-tooltip
        anchor="bottom right"
        self="top right"
      >
        Export Selected Spells
      </q-tooltip>
    </button>

    <button v-on:click="paste">
      <i>cloud_upload</i>
      <q-tooltip
        anchor="bottom right"
        self="top right"
      >
        Import Selected Spells
      </q-tooltip>
    </button>
  </div>
</template>

<script>
import { state } from '../store'

export default {
  data () {
    return {
      state
    }
  },
  methods: {
    copy () {
      console.log('Copy Chosen!', this.state.chosen)
    },
    paste () {
      console.log('Load Chosen!')
    }
  }
}
</script>

<style scoped lang="stylus">
  .logo
    height: 1.25em
    vertical-align: middle
</style>
