<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        My Spells v2.0 

        <q-search
          class="primary"
          v-model="search"
        ></q-search>
      </q-toolbar-title>
    </div>

    <div class="layout-view">
      <spell-list
        v-if="state.spells.data.length"
        :spells="state.spells.data"
        :search="search"
      ></spell-list>
    </div>
  </q-layout>
</template>

<script>
import { Loading, Dialog } from 'quasar'
import Vue from 'vue'
import 'whatwg-fetch'
import { state, dispatch } from '../store'
import SpellList from './Spelllist'

Vue.component('spell-list', SpellList)

export default {
  data () {
    return {
      state,
      search: ''
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
