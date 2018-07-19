<template lang='pug'>
.preferences
  el-row(:gutter="10")
    .title
      h1 Preferences
  el-row(:gutter="15")
    el-col(:span="8")
      .column.grid-content
        h2 Background
        .block
          label Color:
          div
            el-color-picker(v-model.lazy.trim="bgColor")
        .block
          label Image Display Style:
          br
          el-radio-group(v-model.lazy="bgDisplayStyle")
            el-radio(:label="1") cover
            el-radio(:label="0") contain
        .block
          label Images:
          el-upload.upload(
            action=""
            :on-change="handleAdd"
            :on-remove="handleRemove"
            :file-list="preferences.bgImages"
            list-type="picture"
            accept="image/*"
            :auto-upload="false")
            el-button(size="small" type="primary") Select jpeg/png
            div(slot="tip" class="el-upload__tip") Multipul files are shown randomly.
    el-col(:span="7")
      .column.grid-content
        h3 Image Filters
        .block
          label Brightness: {{preferences.filters.brightness}} % (0-500)
          el-slider(:min="0" :max="500" v-model.lazy="brightness")
        .block
          label Contrast: {{preferences.filters.contrast}} % (0-500)
          el-slider(:min="0" :max="500" v-model.lazy="contrast")
        .block
          label Saturate: {{preferences.filters.saturate}} % (0-100)
          el-slider(:min="0" :max="100" v-model.lazy="saturate")
        .block
          label Grayscale: {{preferences.filters.grayscale}} % (0-100)
          el-slider(:min="0" :max="100" v-model.lazy="grayscale")
        .block
          label Sepia: {{preferences.filters.sepia}} % (0-100)
          el-slider(:min="0" :max="100" v-model.lazy="sepia")
        .block
          label Hue-Rotate: {{preferences.filters['hue-rotate']}} deg (0-360)
          el-slider(:min="0" :max="360" v-model.lazy="hueRotate")
        .block
          label Invert: {{preferences.filters.invert}} % (0-100)
          el-slider(:min="0" :max="100" v-model.lazy="invert")
        .block
          label Opacity: {{preferences.filters.opacity}} % (0-100)
          el-slider(:min="0" :max="100" v-model.lazy="opacity")
        .block
          label Blur: {{preferences.filters.blur}} px (0-20)
          el-slider(:min="0" :max="20" v-model.lazy="blur")
    el-col(:span="8" :offset="1")
      .column.grid-content
        h2 Editor/Note
        .block
          label Dummy Text:
          el-input(
            placeholder="Write something you want in Markdown"
            v-model.lazy.trim="dummyText"
          )
        .block
          label Font Color:
          div
            el-color-picker(v-model.lazy.trim="fontColor")
        .block
          label Text Edge Style:
          br
          el-radio-group(v-model.lazy="textEdgeStyle")
            el-radio(:label="0") None
            el-radio(:label="1") Normal
            el-radio(:label="2") Bold
        .block
          label Text Edge Color:
          div
            el-color-picker(v-model.lazy.trim="textEdgeColor")
        .block
          label Assist List Syntax:
          div
            el-switch(v-model.lazy="assistListSyntax")
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Preferences',
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
        }
      },
      required: true,
    },
  },
  computed: {
    bgColor: {
      get() {
        return this.preferences.bgColor
      },
      set(val) {
        this.$emit('updatePreferences', 'bgColor', val)
      },
    },
    bgDisplayStyle: {
      get() {
        return Number(this.preferences.bgDisplayStyle)
      },
      set(val) {
        this.$emit('updatePreferences', 'bgDisplayStyle', val)
      },
    },
    bgFileUrl: {
      get() {
        return this.preferences.bgFileUrl
      },
      async set(val) {
        this.$emit('updatePreferences', 'bgFileUrl', val)
        this.cacheBgImage()
      },
    },
    isCacheBgImage: {
      get() {
        return this.preferences.isCacheBgImage
      },
      async set(val) {
        this.$emit('updatePreferences', 'isCacheBgImage', val)
        this.cacheBgImage()
      },
    },
    brightness: {
      get() {
        return Number(this.preferences.filters.brightness)
      },
      set(val) {
        this.$emit('updatePreferences', 'filters.brightness', val)
      },
    },
    contrast: {
      get() {
        return Number(this.preferences.filters.contrast)
      },
      set(val) {
        this.$emit('updatePreferences', 'filters.contrast', val)
      },
    },
    saturate: {
      get() {
        return Number(this.preferences.filters.saturate)
      },
      set(val) {
        this.$emit('updatePreferences', 'filters.saturate', val)
      },
    },
    grayscale: {
      get() {
        return Number(this.preferences.filters.grayscale)
      },
      set(val) {
        this.$emit('updatePreferences', 'filters.grayscale', val)
      },
    },
    sepia: {
      get() {
        return Number(this.preferences.filters.sepia)
      },
      set(val) {
        this.$emit('updatePreferences', 'filters.sepia', val)
      },
    },
    hueRotate: {
      get() {
        return Number(this.preferences.filters['hue-rotate'])
      },
      set(val) {
        this.$emit('updatePreferences', 'filters.hue-rotate', val)
      },
    },
    invert: {
      get() {
        return Number(this.preferences.filters.invert)
      },
      set(val) {
        this.$emit('updatePreferences', 'filters.invert', val)
      },
    },
    opacity: {
      get() {
        return Number(this.preferences.filters.opacity)
      },
      set(val) {
        this.$emit('updatePreferences', 'filters.opacity', val)
      },
    },
    blur: {
      get() {
        return Number(this.preferences.filters.blur)
      },
      set(val) {
        this.$emit('updatePreferences', 'filters.blur', val)
      },
    },
    dummyText: {
      get() {
        return this.preferences.dummyText
      },
      set(val) {
        this.$emit('updatePreferences', 'dummyText', val)
      },
    },
    fontColor: {
      get() {
        return this.preferences.fontColor
      },
      set(val) {
        this.$emit('updatePreferences', 'fontColor', val)
        localStorage.setItem('fontColor', val)
      },
    },
    textEdgeStyle: {
      get() {
        return Number(this.preferences.textEdgeStyle)
      },
      set(val) {
        this.$emit('updatePreferences', 'textEdgeStyle', val)
        localStorage.setItem('textEdgeStyle', val)
      },
    },
    textEdgeColor: {
      get() {
        return this.preferences.textEdgeColor
      },
      set(val) {
        this.$emit('updatePreferences', 'textEdgeColor', val)
        localStorage.setItem('textEdgeColor', val)
      },
    },
    assistListSyntax: {
      get() {
        return this.preferences.assistListSyntax
      },
      set(val) {
        this.$emit('updatePreferences', 'assistListSyntax', val)
        localStorage.setItem('assistListSyntax', val)
      },
    },
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit('updatePreferences', 'bgImages', fileList)
    },
    async handleAdd(file, fileList) {
      if (/^image\/(png|jpeg)$/.test(file.raw.type) === false) {
        return false
      }
      const convertedFile = await this.imageConvert(file)
      const images = _.map(fileList, f => {
        if (f.uid === convertedFile.uid) {
          return convertedFile
        } else {
          return f
        }
      })
      this.$emit('updatePreferences', 'bgImages', images)
    },
    async imageConvert(file) {
      let srcData = file.url
      const fileReader = new FileReader()
      function loadImg() {
        return new Promise((resolve, reject) => {
          fileReader.onload = function(fileLoadedEvent) {
            srcData = fileLoadedEvent.target.result
            resolve(srcData)
          }
        })
      }
      await fileReader.readAsDataURL(file.raw)
      await loadImg()
      const convertedFile = {
        uid: file.uid,
        name: file.name,
        status: 'success',
        url: srcData,
      }
      return convertedFile
    },
  },
}
</script>

<style lang='stylus' scoped>
.preferences
  display: block
  padding: 15px 30px
  width: 100vw
.title
  text-align: center
.column
  border-radius: 4px
</style>
