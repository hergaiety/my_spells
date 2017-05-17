<template>
  <div>
    <q-select
      type="list"
      v-model="state.sortBy"
      :options="sortByOptions"
    ></q-select>

    <q-search
      class="dark"
      v-model="state.search"
      @input="searchChanged"
    ></q-search>
  </div>
</template>

<script>
import { state, dispatch } from '../store'

export default {
  data () {
    return { state }
  },
  computed: {
    sortByOptions () {
      let options = [
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Level',
          value: 'level'
        }
      ]

      if (this.state.search.length >= 3) {
        options.unshift({
          label: 'Relevance',
          value: 'sortScore'
        })
      }

      return options
    }
  },
  methods: {
    searchChanged (newSearch) {
      if (newSearch.length >= 3) {
        this.state.previousSortBy = this.state.sortBy
        this.state.sortBy = 'sortScore'
      }
      else {
        this.state.sortBy = this.state.previousSortBy
      }

      dispatch({ type: 'SEARCH_CHANGED' })
    }
  }
}
</script>

<style>
</style>
