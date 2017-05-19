<template>
  <div>
    <h1>
      {{spell.name}}
      <span class="label circular bg-primary text-white">
        {{level}}
      </span>
    </h1>
    <ol class="list no-border">
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
      <li class="item">
        <i class="item-primary">short_text</i>
        <div class="item-content">
          {{spell.description}}
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import { state } from '../store'
import { capitalize } from '../utils'

export default {
  data () {
    return { state }
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
    }
  }
}
</script>

<style>
</style>
