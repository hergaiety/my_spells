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
    <div class="item-secondary" v-on:click="toggle">
      <i
        class="float-left text-pink bookmark checked"
        v-if="checked"
      >bookmark</i>
      <i
        class="float-left text-grey-7 bookmark"
        v-else
      >bookmark_border</i>
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
    toggle () {
      dispatch({
        type: 'CHANGE_CHOSEN',
        data: {
          want: !this.checked,
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
    height: 50px
    margin: 0
    padding: 12px
    .bookmark
      transition: transform .25s ease
    &:hover,
    &:target
      .bookmark
        transform: scale(1.5)
      .bookmark:not(.checked)
        color: yellow !important
    &:active
      .bookmark:not(.checked)
        color: deeppink !important
</style>
