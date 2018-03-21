<template lang='pug'>
.editor.markdown-body(@keyup.ctrl.enter="toggleEditor()" @keyup.esc="toggleEditor()")
  .notearea(:class="{dummy: !input.trim()}" v-html="compiledMarkdown" @click="toggleEditor()" v-if="!isEditable" :style="text")
  textarea.textarea(:value="input" @input="update" :placeholder="dummyTextSetting" v-else)
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
      isEditable          : false,
      input               : '',
      dummyTextSetting    : 'Write something you want in Markdown',
      fontColorSetting    : '#FFFFFF',
      textEdgeStyleSetting: 0,
      textEdgeColorSetting: '#000000',
    }
  },
  computed: {
    compiledMarkdown () {
      let markdownText = this.input.trim() || this.dummyTextSetting
      return marked(markdownText, { gfm: true, tables: true, breaks: true, sanitize: true })
    },
    text () {
      let style = ''
      let regexColor = /^#([\da-fA-F]{6}|[\da-fA-F]{3})$/
      let shadowColor = this.textEdgeColorSetting.trim()
      let color = this.fontColorSetting.trim()
      let edgeStyle = Number(this.textEdgeStyleSetting)
      if (regexColor.test(color)) {
        style += `color: ${color};`
      }
      if (edgeStyle !== 0 && regexColor.test(shadowColor)) {
        if (edgeStyle === 2) {
          style += `text-shadow: ${shadowColor} 2px 0,  ${shadowColor} -2px 0, ${shadowColor} 0 -2px, ${shadowColor} 0 2px, ${shadowColor} 2px 2px , ${shadowColor} -2px 2px, ${shadowColor} 2px -2px, ${shadowColor} -2px -2px, ${shadowColor} 1px 2px,  ${shadowColor} -1px 2px, ${shadowColor} 1px -2px, ${shadowColor} -1px -2px, ${shadowColor} 2px 1px,  ${shadowColor} -2px 1px, ${shadowColor} 2px -1px, ${shadowColor} -2px -1px;`
        } else if (edgeStyle === 1) {
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
    this.dummyTextSetting = localStorage.getItem('dummyTextSetting') || this.dummyTextSetting
    this.fontColorSetting = localStorage.getItem('fontColor') || this.fontColorSetting
    this.textEdgeStyleSetting = localStorage.getItem('textEdgeStyle') || this.textEdgeStyleSetting
    this.textEdgeColorSetting = localStorage.getItem('textEdgeColor') || this.textEdgeColorSetting
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
