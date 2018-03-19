<template lang='pug'>
  #app
    router-view/
    Menu.menu
</template>

<script>
import Menu from '@/components/Menu.vue'
export default {
  name      : 'App',
  components: {
    Menu,
  },
}
</script>

<style lang='stylus'>
@import "./css/style"
#app
  padding: 15px
.menu
  // 右下、mousehoverで実体化、しないと半透明
</style>
