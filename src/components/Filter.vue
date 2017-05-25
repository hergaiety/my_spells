<template>
  <div class="row">
    <q-select
      type="list"
      v-model="state.sortBy"
      :options="sortByOptions"
    ></q-select>

    <q-search
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

<style scoped lang="stylus">
  .row
    padding: 1em
  .q-picker-textfield
    margin-right: 1em
</style>
