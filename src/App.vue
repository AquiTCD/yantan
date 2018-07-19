<template lang='pug'>
  #app
    transition(name="page")
      router-view.main(:preferences='preferences' @updatePreferences="(key, value) => updatePreferences(key, value)")/
    Menu.menu
</template>

<script>
import Menu from '@/components/Menu.vue'
export default {
  name: 'App',
  components: {
    Menu,
  },
  data() {
    return {
      preferences: {
        bgColor: '#000000',
        bgDisplayStyle: 1,
        bgImages: [],
        bgFileUrl: 'https://source.unsplash.com/random',
        filters: {
          brightness: 100,
          contrast: 100,
          saturate: 100,
          grayscale: 0,
          sepia: 0,
          'hue-rotate': 0,
          invert: 0,
          opacity: 60,
          blur: 0,
        },
        dummyText: 'Write something you want in Markdown',
        fontColor: '#FFFFFF',
        textEdgeStyle: 0,
        textEdgeColor: '#000000',
        assistListSyntax: true,
      },
    }
  },
  mounted() {
    this.preferences =
      JSON.parse(localStorage.getItem('preferences')) || this.preferences
  },
  methods: {
    updatePreferences(key, value) {
      const isFilter = /^filters\./
      if (isFilter.test(key)) {
        const filter = key.replace(/^filters\./g, '')
        this.preferences.filters[filter] = value
      } else {
        this.preferences[key] = value
      }
      localStorage.setItem('preferences', JSON.stringify(this.preferences))
    },
  },
}
</script>

<style lang='stylus'>
@import './css/style'

html
  background: transparent
  &::-webkit-scrollbar
    display: none
body
  height: auto
  margin: 0
  min-height: 100vh
  padding: 0
  width: 100vw
#app
  background: transparent
.main
  align-items: center
  bottom: 0
  display: flex
  justify-content: center
  overflow-y: auto
  position: fixed
  top: 0
.menu
  bottom: 15px
  position: fixed
  right: 15px
  z-index: 101
.page-enter-active,
.page-leave-active
  transition: all 0.4s
.page-enter
  opacity: 0
.page-leave-to
  opacity: 0
.page-leave,
.page-enter-to
  margin-bottom: 0
  margin-top: 0
  opacity: 1
.task-list-item-checkbox:checked + .task-list-item-label
  text-decoration: line-through
</style>
