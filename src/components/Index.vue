<template>
  <q-layout>
    <div slot="header" class="toolbar dark">
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

    <div slot="header" class="toolbar dark">
      <q-select
        type="list"
        v-model="sortBy"
        :options="sortByOptions"
      ></q-select>

      <q-search
        class="dark"
        v-model="search"
        @input="searchChanged"
      ></q-search>
    </div>

    <div class="layout-view">
      <section ref="tab-all">
        <spell-list
          :spells="state.spells.data"
          :search="search"
          :sortBy="sortBy"
        ></spell-list>
      </section>

      <section ref="tab-my">
        <spell-list
          v-if="mySpells.length"
          :spells="mySpells"
          :search="search"
          :sortBy="sortBy"
        ></spell-list>
        <div v-else>None :D</div>
      </section>
    </div>

    <footer slot="footer" class="toolbar pink">
      <q-tabs
        class="pink justified"
        :refs="$refs"
        default-tab="tab-all"
      >
        <q-tab name="tab-all" icon="local_library">
          All Spells
        </q-tab>
        <q-tab name="tab-my" icon="bookmark">
          My Spells
          <span
            class="label pointing-left bg-yellow text-dark"
            v-show="mySpells.length"
          >{{mySpells.length}}</span>
        </q-tab>
      </q-tabs>
    </footer>
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
      search: '',
      sortBy: 'name',
      previousSortBy: 'name',
      sortByOptions: [
        {
          label: 'Relevance',
          value: 'sortScore'
        },
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Level',
          value: 'level'
        },
        {
          label: 'School',
          value: 'school'
        }
      ]
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
    },
    searchChanged (newSearch) {
      if (newSearch.length >= 3) {
        this.previousSortBy = this.sortBy
        this.sortBy = 'sortScore'
      }
      else {
        this.sortBy = this.previousSortBy
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  footer .q-tabs
    width: 100%
</style>
