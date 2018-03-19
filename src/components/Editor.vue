<template lang='pug'>
.editor.markdown-body(@keyup.ctrl.enter="toggleEditor()" @keyup.esc="toggleEditor()")
  .notearea.markdown-body(:class="{dammy: !input.trim()}" v-html="compiledMarkdown" @click="toggleEditor()" v-if="!isEditable")
  textarea.textarea(:value="input" @input="update" v-else)
  //- button.close(@click="isEditable = false") close
</template>

<script>
import _ from 'lodash'
import marked from 'marked'
export default {
  name: 'editor',
  data () {
    return {
      isEditable: false,
      input     : '',
      dummyText : 'dummy',
    }
  },
  computed: {
    compiledMarkdown: function () {
      let markdownText = this.input.trim() || this.dummyText
      return marked(markdownText, { gfm: true, tables: true, breaks: true, sanitize: true })
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
    this.input = localStorage.getItem('input') || ''
  },
}
</script>

<style lang='stylus' scoped>
.textarea
  font-size: 20px
  line-height: 1.5
  resize: none
  width: 100%
  height: 500px
  border: 1px solid #ccc
  border-radius: 4px
.notearea
  min-height: 200px
.dammy
  border: 1px dotted #ccc
  border-radius: 4px
</style>
