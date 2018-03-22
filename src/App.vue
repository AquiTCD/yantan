<template lang='pug'>
  #app
    transition(name="page")
      router-view.main/
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
html
  background: transparent
  &::-webkit-scrollbar
    display: none
body
  width: 100vw
  height: auto
  min-height: 100vh
  margin: 0
  padding: 0
#app
  background: transparent
.main
  display: flex
  justify-content: center
  align-items: center
.menu
  position: fixed
  right: 15px
  bottom: 15px
  z-index: 101
.page-enter-active, .page-leave-active
  transition: all .4s
.page-enter
  opacity: 0
.page-leave-to
  opacity: 0
.page-leave, .page-enter-to
  margin-top: 0
  margin-bottom: 0
  opacity: 1
</style>
