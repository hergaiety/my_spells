<template>
  <div v-bind:class="{'checked': checked}">
    <div class="item-primary">
      {{spell.level}}
    </div>
    <div class="item-content has-secondary">
      <router-link :to="spell.link">
        <span class="spell-link-alignment">
          <span class="spell-name">
            {{spell.name}}
          </span>
          <br />
          <span class="spell-classes">
            {{classes}}
          </span>
        </span>
      </router-link>
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
    school () {
      return capitalize(this.spell.school)
    },
    classes () {
      return this.spell.classes.map(cla => capitalize(cla)).join(', ')
    },
    checked () {
      return this.state.chosen.indexOf(this.spell.id) >= 0
    }
  },
  data () {
    return { state }
  },
  props: [
    'spell'
  ],
  methods: {
    toggle () {
      dispatch({
        type: 'CHANGE_CHOSEN',
        data: {
          want: !this.checked,
          id: this.spell.id
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .spell-classes
    color: rgba(0, 0, 0, .54)
  .item.two-lines > .item-content
    height: 100%
    padding: 0
    a
      color: black
      display: table
      height: 100%
      width: 100%
      .spell-link-alignment
        display: table-cell
        vertical-align: middle
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
