<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        My Spells v2.0 
      </q-toolbar-title>
    </div>

    <div class="layout-view">
      <spell-list :spells="store.data"></spell-list>
    </div>
  </q-layout>
</template>

<script>
import { Loading } from 'quasar'
import Vue from 'vue'
import SpellList from './Spelllist'
import 'whatwg-fetch'

let temporaryData = {
  loaded: true,
  data: [
    {
      title: 'example 1',
      description: 'foo'
    }, {
      title: 'example 2',
      description: 'bar'
    }
  ]
}

Vue.component('spell-list', SpellList)

export default {
  data () {
    return {
      store: {
        loaded: false,
        data: []
      }
    }
  },
  mounted () {
    if (this.store.loaded === false) {
      Loading.show()
    }

    setTimeout(() => {
      this.store = temporaryData
      Loading.hide()
    }, 2000)
  }
}
</script>

<style lang="styl">
</style>
