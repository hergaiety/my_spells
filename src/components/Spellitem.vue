<template>
  <div>
    <div class="item-primary">
      {{level}}
    </div>
    <div class="item-content has-secondary" v-on:click="openSpell">
      <div>
        {{spell.name}}
      </div>
      <div>
        {{classes}}
      </div>
    </div>
    <div class="item-secondary">
      <i
        class="float-left text-primary"
        v-if="checked"
        v-on:click="checked = false"
      >bookmark</i>
      <i
        class="float-left"
        v-else
        v-on:click="checked = true"
      >bookmark_border</i>
      <q-checkbox
        class="float-right"
        v-model="checked"
        @input="toggle"
      ></q-checkbox>
    </div>
  </div>
</template>

<script>
import { state, dispatch } from '../store'

let capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

export default {
  computed: {
    level () {
      return this.spell.level.toLowerCase() === 'cantrip' ? '0' : this.spell.level.charAt(0)
    },
    school () {
      return capitalize(this.spell.school)
    },
    classes () {
      return this.spell.classes.map(cla => capitalize(cla)).join(', ')
    },
    checked () {
      return this.state.chosen.indexOf(this.spell.name) >= 0
    }
  },
  data () {
    return {
      state
    }
  },
  props: [
    'spell'
  ],
  methods: {
    openSpell (event) {
      this.$router.push('/spell/' + this.spell.name)
    },
    toggle (want) {
      dispatch({
        type: 'CHANGE_CHOSEN',
        data: {
          want,
          name: this.spell.name
        }
      })
      console.log(state.chosen)
    }
  }
}
</script>

<style scoped lang="stylus">
  .item-secondary
    width: 50px
</style>
