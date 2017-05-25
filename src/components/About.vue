<template>
  <main class="content">
    <h1>About</h1>
    <p>
      My Spells is an <a href="https://github.com/sharpshark28/my_spells"><i>code</i> open source</a>
      web-based application to elegantly view spells and save them to your local spellbook.
    </p>

    <h2>Settings</h2>
    <button
      class="primary"
      v-on:click="wipeChosen"
      :disabled="disableChosen"
    >
      <i class="on-left">delete</i>
      Reset Spellbook
    </button>

    <h2>License</h2>
    <p>
      Open Game License v1.0a Copyright 2000, Wizards of the Coast, Inc.
    </p>
    <p>
      App contains content from the SRD and is restricted and covered by the OGL. You can find the OGL 1.0a at ogl.html in this app's repo, or <a href="http://www.opengamingfoundation.org/ogl.html">online here</a>. When using said data, please make sure to conform appropriately with the proper licenses and whatnot.
    </p>

    <h2>Credit</h2>
    <ul>
      <li>
        ephe's <a href="https://github.com/ephe/grimoire/">grimoire</a> spell list converted json by vorpalhex and cleaned up to meet OGL license standards <a href="https://github.com/vorpalhex/srd_spells">labeled under srd_spells</a>
      <li>
        Built on <a href="https://vuejs.org/">Vue.js</a>
        and the <a href="http://quasar-framework.org/">Quasar Framework</a>
      </li>
      <li>
        Logo magic wand icon by David from the Noun Project
      </li>
    </ul>
  </main>
</template>

<script>
import { Toast } from 'quasar'
import { dispatch, state } from '../store'

export default {
  data () {
    return { state }
  },
  computed: {
    disableChosen () {
      return this.state.chosen.length === 0
    }
  },
  methods: {
    wipeChosen () {
      dispatch({
        type: 'WIPE_CHOSEN'
      })
      Toast.create({
        html: 'Spellbook Reset'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  main
    padding: 0 2em
    max-width: 40rem
</style>
