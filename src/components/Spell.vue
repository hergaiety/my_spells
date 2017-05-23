<template>
  <div class="page-spell">
    <router-link
      tag="button"
      to="/"
      class="page-back-small primary shadow-1"
    >
      <i>arrow_back</i>
      Back
    </router-link>

    <router-link
      tag="button"
      to="/"
      class="page-back-big primary circular big shadow-2"
    >
      <i>arrow_back</i>
    </router-link>

    <div class="card bg-white">
      <div class="card-title bg-pink text-white">
        {{spell.name}}
        <span class="label bg-white text-pink">
          Level {{level}}
        </span>
      </div>
      <ol class="list no-border">
        <li class="item">
          <i class="item-primary">short_text</i>
          <div
            class="item-content description"
            v-html="prettyDescription"
          ></div>
        </li>
        <li class="item">
          <i class="item-primary">accessibility</i>
          <div class="item-content">
            {{classes}}
          </div>
        </li>
        <li class="item">
          <i class="item-primary">group_work</i>
          <div class="item-content">
            {{spell.components.raw}}
          </div>
        </li>
        <li class="item">
          <i class="item-primary">school</i>
          <div class="item-content">
            {{spell.school}}
          </div>
        </li>
        <li class="item">
          <i class="item-primary">hourglass_full</i>
          <div class="item-content">
            {{spell.duration}}
          </div>
        </li>
        <li class="item">
          <i class="item-primary">av_timer</i>
          <div class="item-content">
            {{spell.casting_time}}
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { state } from '../store'
import { capitalize } from '../utils'
import Marked from 'marked'

export default {
  data () {
    return { state }
  },
  mounted () {
    state.lastSpell = this.state.spell.data.name
  },
  computed: {
    spell () {
      return this.state.spells.data.find(spell => spell.name === this.$route.params.name)
    },
    level () {
      return this.spell.level.toLowerCase() === 'cantrip' ? 'C' : this.spell.level
    },
    classes () {
      return this.spell.classes.map(cla => capitalize(cla)).join(', ')
    },
    prettyDescription () {
      let newDescription = this.spell.description
      let keywords = ['constitution', 'con', 'intelligence', 'int', 'wisdom', 'wis', 'strength', 'str', 'dexterity', 'dex', 'charisma', 'cha', 'comeliness', 'com', 'saving throw', 'ability check', 'skill check']
      keywords.forEach(word => {
        let r = new RegExp(` ${word} `, 'gi')
        newDescription = newDescription.replace(r, o => ` _${o.trim()}_ `)
      })

      newDescription = newDescription.replace(/[\s()<>]+\d+d*\d*(th)*[\s()<>]+/gi, o => ` **${o.trim()}** `)
      return Marked(newDescription)
    }
  }
}
</script>

<style scoped lang="stylus">
  .page-spell
    width: 100%
    height: 100%
    position: relative
    padding: 1rem
  .page-back-small
    margin-bottom: 1rem
  .page-back-big
    display: none
  .card
    margin: 0 auto
    max-width: 40rem
  .description
    padding-bottom: 0
  .card-title .label
    margin-left: .5em
  .list
    padding-left: 16px
  .item
    height: auto
    .item-primary
      margin: 12px 0
    .item-content
      margin-left: 50px
  @media screen and (min-height: 800px)
    .card
      position: relative
      top: 50%
      transform: translateY(-50%)
    .page-back-big
      display: block
      position: absolute
      top: 1rem
      left: 1rem
      z-index: 1
    .page-back-small
      display: none
</style>
