<template>
  <div class="page-spell">
    <button
      v-go-back=" '/' "
      class="page-back-small primary shadow-1"
    >
      <i>arrow_back</i>
      Back
    </button>

    <div class="card bg-white">
      <div class="card-title bg-pink text-white">
        {{spell.name}}
        <span class="label bg-white text-pink">
          Level {{level}}
        </span>

        <q-checkbox
          class="float-right pink"
          v-model="checked"
          @input="toggle"
        ></q-checkbox>
        <i
          class="bookmark float-right text-yellow pointer"
          v-if="checked"
          v-on:click="checked = false"
        >bookmark</i>
        <i
          class="bookmark float-right text-grey-5 pointer"
          v-else
          v-on:click="checked = true"
        >bookmark_border</i>
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
import { Loading } from 'quasar'
import { dispatch, state } from '../store'
import { capitalize } from '../utils'
import Marked from 'marked'

export default {
  data () {
    return { state }
  },
  mounted () {
    let scrollingPageElement = document.getElementsByClassName('layout-view')[0]
    scrollingPageElement.scrollTop = 0

    if (this.state.spells.loaded === false) {
      Loading.show()
    }

    this.state.lastSpell = this.spell.id
  },
  computed: {
    checked () {
      return this.state.chosen.indexOf(this.spell.id) >= 0
    },
    spell () {
      return this.state.spells.data.find(spell => spell.id === this.$route.params.id)
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
  },
  methods: {
    toggle (want) {
      dispatch({
        type: 'CHANGE_CHOSEN',
        data: {
          want,
          id: this.spell.id
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .pointer
    cursor: pointer
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
  .bookmark
    font-size: 1.25em
    line-height: 1em
</style>
