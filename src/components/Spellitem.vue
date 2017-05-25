<template>
  <div v-bind:class="{'checked': checked}">
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
        class="float-left text-pink"
        v-if="checked"
        v-on:click="checked = false"
      >bookmark</i>
      <i
        class="float-left text-grey-5"
        v-else
        v-on:click="checked = true"
      >bookmark_border</i>
      <q-checkbox
        class="float-right pink"
        v-model="checked"
        @input="toggle"
      ></q-checkbox>
    </div>
  </div>
</template>

<script>
import { state, dispatch } from '../store'
import { capitalize } from '../utils'

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
    return { state }
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
    }
  }
}
</script>

<style scoped lang="stylus">
  .item-secondary
    width: 50px
</style>
