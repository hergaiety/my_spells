<template>
  <div id="q-app">
    <q-layout class="bg-light">
      <nav-header
        slot="header"
        class="toolbar dark"
      ></nav-header>

      <div class="layout-view">
        <router-view></router-view>
      </div>

      <nav-footer
        slot="footer"
        class="toolbar pink"
      ></nav-footer>
    </q-layout>
  </div>
</template>

<script>
import { LocalStorage, Loading, Dialog } from 'quasar'
import Vue from 'vue'
import 'whatwg-fetch'
import { state, dispatch } from './store'
import Header from './components/Header'
import Footer from './components/Footer'

Vue.component('nav-header', Header)
Vue.component('nav-footer', Footer)

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

function fetchSpells () {
  fetch('./statics/dnd5e.json')
  .then(response => response.json())
  .then(fetchSuccess)
  .catch(fetchFailure)
  .then(() => { Loading.hide() })
}

export default {
  data () {
    return { state }
  },
  mounted () {
    if (LocalStorage.has('chosen')) {
      dispatch({
        type: 'LOAD_LOCAL_CHOSEN'
      })
    }

    if (!this.state.spells.loaded) {
      Loading.show()

      fetchSpells()
    }
  }
}
</script>


<style lang="stylus">
  .toolbar > .q-picker-textfield
    margin: 0 .75em
</style>
