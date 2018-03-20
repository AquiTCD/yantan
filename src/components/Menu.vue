<template lang='pug'>
.menus
  router-link(:to="{ name: 'preferences', params: {} }" v-if="isEditing") Preferences
  router-link(:to="{ name: 'editor', params: {} }" v-else) Edit
</template>

<script>
export default {
  name    : 'menus',
  computed: {
    isEditing () {
      return this.$route.name === 'editor'
    },
  },
}
</script>

<style lang='stylus' scoped>

</style>
