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
import { Loading } from 'quasar'
import Vue from 'vue'
import { state } from '../store'
import SpellList from './Spelllist'
// import 'whatwg-fetch'

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
      state
    }
  },
  mounted () {
    if (this.state.spells.loaded === false) {
      Loading.show()
    }

    setTimeout(() => {
      this.state.spells = temporaryData
      Loading.hide()
    }, 2000)
  }
}
</script>

<style lang="styl">
</style>
