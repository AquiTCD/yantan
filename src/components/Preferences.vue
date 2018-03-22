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
          el-input(
            placeholder="#000000"
            v-model.lazy.trim="bgColor"
          )
        .block
          label Image Display Style:
          br
          el-radio-group(v-model="bgDisplayStyle")
            el-radio(:label="1") cover
            el-radio(:label="0") contain
        .block
          label Image URL:
          el-input(
            placeholder="http://www.example.com/sample.jpg"
            v-model.lazy.trim="bgFileUrl"
          )
    el-col(:span="7")
      .column.grid-content
        h3 Image Filters
        .block
          label Brightness: {{filterSettings.brightness}} % (0-500)
          el-slider(:min="0" :max="500" v-model="brightness")
        .block
          label Contrast: {{filterSettings.contrast}} % (0-500)
          el-slider(:min="0" :max="500" v-model="contrast")
        .block
          label Saturate: {{filterSettings.saturate}} % (0-100)
          el-slider(:min="0" :max="100" v-model="saturate")
        .block
          label Grayscale: {{filterSettings.grayscale}} % (0-100)
          el-slider(:min="0" :max="100" v-model="grayscale")
        .block
          label Sepia: {{filterSettings.sepia}} % (0-100)
          el-slider(:min="0" :max="100" v-model="sepia")
        .block
          label Hue-Rotate: {{filterSettings['hue-rotate']}} deg (0-360)
          el-slider(:min="0" :max="360" v-model="hueRotate")
        .block
          label Invert: {{filterSettings.invert}} % (0-100)
          el-slider(:min="0" :max="100" v-model="invert")
        .block
          label Opacity: {{filterSettings.opacity}} % (0-100)
          el-slider(:min="0" :max="100" v-model="opacity")
        .block
          label Blur: {{filterSettings.blur}} px (0-20)
          el-slider(:min="0" :max="20" v-model="blur")
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
          el-input(
            placeholder="#FFFFFF"
            v-model.lazy.trim="fontColor"
          )
        .block
          label Text Edge Style:
          br
          el-radio-group(v-model="textEdgeStyle")
            el-radio(:label="0") None
            el-radio(:label="1") Normal
            el-radio(:label="2") Bold
        .block
          label Text Edge Color:
          el-input(
            placeholder="#000000"
            v-model.lazy.trim="textEdgeColor"
          )
</template>

<script>
export default {
  name: 'preferences',
  data () {
    return {
      bgColorSetting       : '#000000',
      bgDisplayStyleSetting: 1,
      bgFileUrlSetting     : 'https://source.unsplash.com/random',
      filterSettings       : {
        'brightness': 100,
        'contrast'  : 100,
        'saturate'  : 100,
        'grayscale' : 0,
        'sepia'     : 0,
        'hue-rotate': 0,
        'invert'    : 0,
        'opacity'   : 60,
        'blur'      : 0,
      },
      dummyTextSetting    : 'Write something you want in Markdown',
      fontColorSetting    : '#FFFFFF',
      textEdgeStyleSetting: 0,
      textEdgeColorSetting: '#000000',
    }
  },
  computed: {
    bgColor: {
      get () {
        return this.bgColorSetting
      },
      set (val) {
        this.bgColorSetting = val
        localStorage.setItem('bgColor', val)
      },
    },
    bgDisplayStyle: {
      get () {
        return Number(this.bgDisplayStyleSetting)
      },
      set (val) {
        this.bgDisplayStyleSetting = val
        localStorage.setItem('bgDisplayStyle', val)
      },
    },
    bgFileUrl: {
      get () {
        return this.bgFileUrlSetting
      },
      set (val) {
        this.bgFileUrlSetting = val
        localStorage.setItem('bgFileUrl', val)
      },
    },
    brightness: {
      get () {
        return Number(this.filterSettings.brightness)
      },
      set (val) {
        this.filterSettings.brightness = val
        localStorage.setItem('filterBrightness', val)
      },
    },
    contrast: {
      get () {
        return Number(this.filterSettings.contrast)
      },
      set (val) {
        this.filterSettings.contrast = val
        localStorage.setItem('filterContrast', val)
      },
    },
    saturate: {
      get () {
        return Number(this.filterSettings.saturate)
      },
      set (val) {
        this.filterSettings.saturate = val
        localStorage.setItem('filterSaturate', val)
      },
    },
    grayscale: {
      get () {
        return Number(this.filterSettings.grayscale)
      },
      set (val) {
        this.filterSettings.grayscale = val
        localStorage.setItem('filterGrayscale', val)
      },
    },
    sepia: {
      get () {
        return Number(this.filterSettings.sepia)
      },
      set (val) {
        this.filterSettings.sepia = val
        localStorage.setItem('filterSepia', val)
      },
    },
    hueRotate: {
      get () {
        return Number(this.filterSettings['hue-rotate'])
      },
      set (val) {
        this.filterSettings['hue-rotate'] = val
        localStorage.setItem('filterHueRotate', val)
      },
    },
    invert: {
      get () {
        return Number(this.filterSettings.invert)
      },
      set (val) {
        this.filterSettings.invert = val
        localStorage.setItem('filterInvert', val)
      },
    },
    opacity: {
      get () {
        return Number(this.filterSettings.opacity)
      },
      set (val) {
        this.filterSettings.opacity = val
        localStorage.setItem('filterOpacity', val)
      },
    },
    blur: {
      get () {
        return Number(this.filterSettings.blur)
      },
      set (val) {
        this.filterSettings.blur = val
        localStorage.setItem('filterBlur', val)
      },
    },
    dummyText: {
      get () {
        return this.dummyTextSetting
      },
      set (val) {
        this.dummyTextSetting = val
        localStorage.setItem('dummyText', val)
      },
    },
    fontColor: {
      get () {
        return this.fontColorSetting
      },
      set (val) {
        this.fontColorSetting = val
        localStorage.setItem('fontColor', val)
      },
    },
    textEdgeStyle: {
      get () {
        return Number(this.textEdgeStyleSetting)
      },
      set (val) {
        this.textEdgeStyleSetting = val
        localStorage.setItem('textEdgeStyle', val)
      },
    },
    textEdgeColor: {
      get () {
        return this.textEdgeColorSetting
      },
      set (val) {
        this.textEdgeColorSetting = val
        localStorage.setItem('textEdgeColor', val)
      },
    },
  },
  mounted () {
    this.bgFileUrlSetting = localStorage.getItem('bgFileUrl') || this.bgFileUrlSetting
    this.bgDisplayStyleSetting = localStorage.getItem('bgDisplayStyle') || this.bgDisplayStyleSetting
    this.bgColorSetting = localStorage.getItem('bgColor') || this.bgColorSetting
    this.filterSettings.brightness = localStorage.getItem('filterBrightness') || this.filterSettings.brightness
    this.filterSettings.contrast = localStorage.getItem('filterContrast') || this.filterSettings.contrast
    this.filterSettings.saturate = localStorage.getItem('filterSaturate') || this.filterSettings.saturate
    this.filterSettings.grayscale = localStorage.getItem('filterGrayscale') || this.filterSettings.grayscale
    this.filterSettings.sepia = localStorage.getItem('filterSepia') || this.filterSettings.sepia
    this.filterSettings['hue-rotate'] = localStorage.getItem('filterHueRotate') || this.filterSettings['hue-rotate']
    this.filterSettings.invert = localStorage.getItem('filterInvert') || this.filterSettings.invert
    this.filterSettings.opacity = localStorage.getItem('filterOpacity') || this.filterSettings.opacity
    this.filterSettings.blur = localStorage.getItem('filterBlur') || this.filterSettings.blur
    this.dummyTextSetting = localStorage.getItem('dummyText') || this.dummyTextSetting
    this.fontColorSetting = localStorage.getItem('fontColor') || this.fontColorSetting
    this.textEdgeStyleSetting = localStorage.getItem('textEdgeStyle') || this.textEdgeStyleSetting
    this.textEdgeColorSetting = localStorage.getItem('textEdgeColor') || this.textEdgeColorSetting
  },
}
</script>

<style lang='stylus' scoped>
.preferences
  display: block
  width: 100vw
  padding: 15px 30px
.title
  text-align: center
.column
  border-radius: 4px
</style>
