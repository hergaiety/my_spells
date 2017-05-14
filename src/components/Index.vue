<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        My Spells v2.0 
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

    <div slot="header" class="toolbar primary">
      <q-search
        class="primary"
        v-model="search"
      ></q-search>
    </div>

    <div slot="header" class="toolbar primary">
      <q-tabs
        :refs="$refs"
        default-tab="tab-all"
      >
        <q-tab name="tab-all" icon="local_library">
          All Spells
        </q-tab>
        <q-tab name="tab-my" icon="bookmark">
          My Spells
        </q-tab>
      </q-tabs>
    </div>

    <div class="layout-view">
      <section ref="tab-all">
        <spell-list
          :spells="state.spells.data"
          :search="search"
        ></spell-list>
      </section>

      <section ref="tab-my">
        <spell-list
          v-if="mySpells.length"
          :spells="mySpells"
          :search="search"
        ></spell-list>
        <div v-else>None :D</div>
      </section>
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
  computed: {
    mySpells () {
      if (!this.state.spells.loaded || this.state.chosen.length === 0) {
        return []
      }

      return this.state.chosen.map(chosen => {
        return this.state.spells.data.find(spell => {
          return spell.name === chosen
        })
      })
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
