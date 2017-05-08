<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        My Spells v2.0 
      </q-toolbar-title>
    </div>

    <div class="layout-view">
      <spell-list :spells="state.spells.data"></spell-list>
    </div>
  </q-layout>
</template>

<script>
import { Loading, Dialog } from 'quasar'
import Vue from 'vue'
import { state, dispatch } from '../store'
import SpellList from './Spelllist'
import 'whatwg-fetch'

Vue.component('spell-list', SpellList)

export default {
  data () {
    return {
      state
    }
  },
  mounted () {
    if (this.state.spells.loaded === false) {
      Loading.show()

      fetch('./statics/dnd5e.json')
      .then(response => response.json())
      .then(spells => {
        dispatch({
          type: 'SPELLS_RESOLVED',
          data: {
            loaded: true,
            data: spells
          }
        })
      })
      .catch(reason => {
        let message = 'Unable to retrieve spells list'
        Dialog.create({
          title: 'Error',
          message,
          nobuttons: true
        })
        console.error(message, reason)
      })
      .then(() => { Loading.hide() })
    }
  }
}
</script>

<style lang="styl">
</style>
