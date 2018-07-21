<template lang='pug'>
.editor.markdown-body(@click="closeEditor($event)")
  .notearea(v-html="compiledMarkdown" @click.stop="clickEditor($event)" v-if="!isEditing" :style="text")
  .textarea(v-else @click.stop="openEditor($event)")
    textarea(
      :value="input"
      @input="update"
      :placeholder="placeholder"
      @keydown.enter.exact.prevent="assistAddList"
      @keydown.tab.exact.prevent="assistAddIndent"
      @keydown.shift.extact.tab.exact.prevent="assistRemoveIndent"
      @keyup.esc="closeEditor($event)"
      @keyup.ctrl.enter="closeEditor($event)")
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
          assistListSyntax: true,
          assistIndent: true,
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
      return this.preferences.dummyText
    },
    text() {
      try {
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
      } catch (e) {
        return false
      }
    },
  },
  mounted() {
    this.input = localStorage.getItem('input') || this.input
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value
      localStorage.setItem('input', e.target.value)
    }, 50),
    async assistAddList() {
      const textarea = await document.getElementsByTagName('textarea')[0]
      const carretPos = await textarea.selectionStart
      const inputArray = await this.input.substr(0, carretPos).split('\n')
      const currentLine = inputArray[inputArray.length - 1]
      let autoComplete = '\n'
      if (this.preferences.assistListSyntax) {
        const ul = await currentLine.match(
          /^(\s*)(-|\+|\*)(\s\[\s\]|\s\[x\])*\s.*$/i
        )
        const ol = await currentLine.match(/^(\s*)(\d*\.)\s.*$/i)
        if (ul) {
          autoComplete += `${ul[1]}${ul[2]}${ul[3] || ''} `
        } else if (ol) {
          autoComplete += `${ol[1]}${ol[2]} `
        }
      }
      this.input =
        this.input.substr(0, carretPos) +
        autoComplete +
        this.input.substr(carretPos, this.input.length)
      const newCarret = await (carretPos + autoComplete.length)
      textarea.setSelectionRange(newCarret, newCarret)
    },
    async assistAddIndent() {
      if (this.preferences.assistIndent) {
        const textarea = await document.getElementsByTagName('textarea')[0]
        const carretPos = await textarea.selectionStart
        const inputArray = await this.input.substr(0, carretPos).split('\n')
        const autoComplete = '  '
        let textBeforeCarret = ''
        await inputArray.forEach((line, i) => {
          if (i === inputArray.length - 1) {
            line = autoComplete + line
          } else {
            line += '\n'
          }
          textBeforeCarret += line
        })
        this.input =
          textBeforeCarret + this.input.substr(carretPos, this.input.length)
        const newCarret = await (carretPos + autoComplete.length)
        textarea.setSelectionRange(newCarret, newCarret)
      }
    },
    async assistRemoveIndent() {
      if (this.preferences.assistIndent) {
        const textarea = await document.getElementsByTagName('textarea')[0]
        const carretPos = await textarea.selectionStart
        const inputArray = await this.input.substr(0, carretPos).split('\n')
        let textBeforeCarret = ''
        let indentCount = 0
        await inputArray.forEach((line, i) => {
          if (i === inputArray.length - 1) {
            const matched = line.match(/^\s{1,2}/)
            if (matched) {
              indentCount = matched[0].length
              line = line.slice(indentCount)
            }
          } else {
            line += '\n'
          }
          textBeforeCarret += line
        })
        this.input =
          textBeforeCarret + this.input.substr(carretPos, this.input.length)
        const newCarret = await (carretPos - indentCount)
        textarea.setSelectionRange(newCarret, newCarret)
      }
    },
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
.textarea,
.notearea
  height: 61vh
  min-height: 200px
  width: 61vw
  z-index: 100
textarea
  border: 1px solid #ccc
  border-radius: 4px
  font-size: 18px
  height: 100%
  line-height: 1.5
  padding: 0.39em
  resize: none
  width: 100%
</style>
