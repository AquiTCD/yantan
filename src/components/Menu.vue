<template lang='pug'>
.menus
  el-button.translucent(v-if="isEditor" icon="el-icon-setting" size="mini" round @click="movePageTo('preferences')") Preferences
  el-button(v-else icon="el-icon-edit" size="mini" round @click="movePageTo('editor')") Edit Note
</template>

<script>
export default {
  name: 'Menus',
  computed: {
    isEditor() {
      return this.$route.name === 'editor'
    },
  },
  methods: {
    movePageTo(page) {
      this.$router.push({
        name: page,
        params: {},
      })
    },
  },
}
</script>

<style lang='stylus' scoped>
.translucent
  opacity: 0.2
  transition-duration: 0.4s
  &:hover
    opacity: 1
</style>
