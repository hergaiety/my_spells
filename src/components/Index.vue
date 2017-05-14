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

function fetchSuccess (data) {
  dispatch({
    type: 'SPELLS_RESOLVED',
    data: {
      data,
      loaded: true
    }
  })
}

function fetchFailure (reason) {
  let message = 'Unable to retrieve spells list'
  Dialog.create({
    title: 'Error',
    message,
    nobuttons: true
  })
  console.error(message, reason)
}

export default {
  data () {
    return {
      state,
      search: ''
    }
  },
  mounted () {
    if (!this.state.spells.loaded) {
      Loading.show()

      fetch('./statics/dnd5e.json')
      .then(response => response.json())
      .then(fetchSuccess)
      .catch(fetchFailure)
      .then(() => { Loading.hide() })
    }
  }
}
</script>
