<template lang='pug'>
.editor.markdown-body(@click="closeEditor($event)")
  .notearea(v-html="compiledMarkdown" @click.stop="clickEditor($event)" v-if="!isEditing" :style="text")
  .textarea(v-else @click.stop="openEditor($event)")
    textarea(:value="input" @input="update" :placeholder="placeholder" @keyup.esc="closeEditor($event)" @keyup.ctrl.enter="closeEditor($event)")
  Background(:preferences='preferences')
</template>

<script>
import _ from 'lodash'
import md from 'markdown-it'
import emoji from 'markdown-it-emoji'
import taskLists from 'markdown-it-task-lists'
import Background from '@/components/Background.vue'
const parser = md({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .use(emoji)
  .use(taskLists, {
    enabled: true,
    label: true,
    labelAfter: true,
  })
export default {
  name: 'Editor',
  components: {
    Background,
  },
  props: {
    preferences: {
      type: Object,
      default() {
    return {
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
        }
      },
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      input: '',
    }
  },
  computed: {
    compiledMarkdown() {
      const markdownText = this.input.trim() || this.preferences.dummyText
      return parser.render(markdownText)
    },
    placeholder() {
      return this.dummyText
    },
    text() {
      let style = ''
      const regexColor = /^#([\da-fA-F]{6}|[\da-fA-F]{3})$/
      const shadowColor = this.preferences.textEdgeColor.trim()
      const color = this.preferences.fontColor.trim()
      const edgeStyle = Number(this.preferences.textEdgeStyle)
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
  mounted() {
    this.input = localStorage.getItem('input') || this.input
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value
      localStorage.setItem('input', e.target.value)
    }, 300),
    toggleEditor(event) {
      return this.isEditing ? this.closeEditor(event) : this.openEditor(event)
    },
    openEditor(event) {
      return (this.isEditing = true)
    },
    closeEditor(event) {
      return (this.isEditing = false)
    },
    clickEditor(event) {
      const src = event.srcElement
      if (src.tagName === 'INPUT') {
        return this.toggleCheckbox(src.id)
      } else if (src.tagName === 'A' || src.tagName === 'LABEL') {
        return event.stopPropagation()
      } else {
        return this.openEditor(event)
      }
    },
    toggleCheckbox(id) {
      const text = document.querySelector(`label[for=${id}]`).innerText
      const checkbox = document.getElementById(id)
      const checkState = !!checkbox.checked
      const check = checkState ? '\\s' : 'x|X'
      const before = new RegExp(
        `(\\s*)(\\*|-|\\+)(\\s*)\\[(${check})\\](${text})\\n`
      )
      const after = checkState ? '$1$2$3[x]$5\n' : '$1$2$3[ ]$5\n'
      this.input = this.input.replace(before, after)
      localStorage.setItem('input', this.input)
    },
  },
}
</script>

<style lang='stylus' scoped>
.editor
  height: 100vh
  width: 100vw
.textarea, .notearea
  width: 61vw
  height: 61vh
  min-height: 200px
  z-index: 100
textarea
  width: 100%
  height: 100%
  font-size: 18px
  line-height: 1.5
  resize: none
  padding: 0.39em
  border: 1px solid #ccc
  border-radius: 4px
</style>
<style lang="stylus">
.task-list-item-checkbox:checked + .task-list-item-label
  text-decoration: line-through
</style>
