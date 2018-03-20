<template lang='pug'>
.editor.markdown-body(@keyup.ctrl.enter="toggleEditor()" @keyup.esc="toggleEditor()")
  .notearea(:class="{dummy: !input.trim()}" v-html="compiledMarkdown" @click="toggleEditor()" v-if="!isEditable" :style="text")
  textarea.textarea(:value="input" @input="update" :placeholder="dummyText" v-else)
  Background
</template>

<script>
import _ from 'lodash'
import marked from 'marked'
import Background from '@/components/Background.vue'
export default {
  name: 'editor',
  data () {
    return {
      isEditable     : false,
      input          : '',
      dummyText      : 'Write something you want in Markdown',
      fontColor      : '#fff',
      isBoldShadow   : true,
      textShadowColor: '',
    }
  },
  computed: {
    compiledMarkdown () {
      let markdownText = this.input.trim() || this.dummyText
      return marked(markdownText, { gfm: true, tables: true, breaks: true, sanitize: true })
    },
    text () {
      let style = ''
      let regexColor = /^#([\da-fA-F]{6}|[\da-fA-F]{3})$/
      let shadowColor = this.textShadowColor.trim()
      let color = this.fontColor.trim()
      if (regexColor.test(color)) {
        style += `color: ${color};`
      }
      if (regexColor.test(shadowColor)) {
        if (this.isBoldShadow) {
          style += `text-shadow: ${shadowColor} 2px 0,  ${shadowColor} -2px 0, ${shadowColor} 0 -2px, ${shadowColor} 0 2px, ${shadowColor} 2px 2px , ${shadowColor} -2px 2px, ${shadowColor} 2px -2px, ${shadowColor} -2px -2px, ${shadowColor} 1px 2px,  ${shadowColor} -1px 2px, ${shadowColor} 1px -2px, ${shadowColor} -1px -2px, ${shadowColor} 2px 1px,  ${shadowColor} -2px 1px, ${shadowColor} 2px -1px, ${shadowColor} -2px -1px;`
        } else {
          style += `text-shadow: ${shadowColor} 1px 1px 0, ${shadowColor} -1px -1px 0, ${shadowColor} -1px 1px 0, ${shadowColor} 1px -1px 0, ${shadowColor} 0px 1px 0, ${shadowColor}  0-1px 0, ${shadowColor} -1px 0 0, ${shadowColor} 1px 0 0;`
        }
      }
      return style || false
    },
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
      localStorage.setItem('input', e.target.value)
    }, 300),
    toggleEditor () {
      this.isEditable = !this.isEditable
    },
  },
  mounted () {
    this.input = localStorage.getItem('input') || this.input
    this.isEditable = localStorage.getItem('isEditable') || this.isEditable
    this.dummyText = localStorage.getItem('dummyText') || this.dummyText
    this.fontColor = localStorage.getItem('fontColor') || this.fontColor
    this.isBoldShadow = localStorage.getItem('isBoldShadow') || this.isBoldShadow
    this.textShadowColor = localStorage.getItem('textShadowColor') || this.textShadowColor
  },
  components: {
    Background,
  },
}
</script>

<style lang='stylus' scoped>
.editor
  height: 100vh
  width: 100vw
.textarea
  font-size: 18px
  line-height: 1.5
  resize: none
  padding: 0.39em
  width: 61vw
  height: 61vh
  min-height: 200px
  border: 1px solid #ccc
  border-radius: 4px
  z-index: 100
.notearea
  width: 61vw
  height: 61vh
  z-index: 100
.dummy
  border-radius: 4px
</style>
