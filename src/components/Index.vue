<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        My Spells v2.0 
      </q-toolbar-title>
    </div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <div class="layout-view">
      <spell-list></spell-list>
    </div>
  </q-layout>
</template>

<script>
import Vue from 'vue'
import SpellList from './Spelllist'

Vue.component('spell-list', SpellList)

export default {
  data () {
    return {}
  }
}
</script>

<style lang="styl">
</style>
