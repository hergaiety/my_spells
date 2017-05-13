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
      <q-checkbox v-model="checked" disable></q-checkbox>
    </div>
  </div>
</template>

<script>
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
    }
  },
  data () {
    return {
      checked: false
    }
  },
  props: [
    'spell'
  ],
  methods: {
    openSpell (event) {
      console.log(this.spell.name)
    }
  }
}
</script>
