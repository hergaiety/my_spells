<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        My Spells v2.0 

          <q-search
            v-model="search"
          ></q-search>
      </q-toolbar-title>
    </div>

    <div class="layout-view">
      <spell-list
        :spells="spells"
      ></spell-list>
    </div>
  </q-layout>
</template>

<script>
import { Loading, Dialog } from 'quasar'
import Vue from 'vue'
import 'whatwg-fetch'
import Query from '../query'
import { state, dispatch } from '../store'
import SpellList from './Spelllist'

Vue.component('spell-list', SpellList)

export default {
  computed: {
    spells () {
      if (this.state.spells.data.length === 0) {
        return []
      }

      let sortBy = this.search.length >= 3 ? 'sortScore' : 'name'

      return new Query(this.state.spells.data)
      .search('name', this.search, 5)
      .sort(sortBy)
      .results
    }
  },
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

<style lang="styl">
</style>
