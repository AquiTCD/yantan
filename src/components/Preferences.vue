<template lang='pug'>
.preferences
  .title
    h1 Preferences
  .row
    .column
      h2 Background
      .block
        ui-textbox(
          floating-label
          label="Color:"
          placeholder="#000000"
          v-model.lazy.trim="bgColor"
        )
      .block
        ui-radio-group(
          name="bg-display"
          :options="bgDisplayStyleLabels"
          v-model="bgDisplayStyle"
        ) Image Display Style
      .block
        ui-textbox(
          floating-label
          label="Image URL:"
          placeholder="http://www.example.com/sample.jpg"
          v-model.lazy.trim="fileUrl"
        )
    .column
      h3 Image Filters
      .block
        label Brightness: {{filterSettings.brightness}} %
        ui-slider(v-model.number.lazy="brightness")
      .block
        label Contrast: {{filterSettings.contrast}} %
        ui-slider(v-model.number.lazy="contrast")
      .block
        label Saturate: {{filterSettings.saturate}} %
        ui-slider(v-model.number.lazy="saturate")
      .block
        label Grayscale: {{filterSettings.grayscale}} %
        ui-slider(v-model.number.lazy="grayscale")
      .block
        label Sepia: {{filterSettings.sepia}} %
        ui-slider(v-model.number.lazy="sepia")
      .block
        label Hue-Rotate: {{filterSettings['hue-rotate']}} %
        ui-slider(v-model.number.lazy="hueRotate")
      .block
        label Invert: {{filterSettings.invert}} deg
        ui-slider(v-model.number.lazy="invert")
      .block
        label Opacity: {{filterSettings.opacity}} %
        ui-slider(v-model.number.lazy="opacity")
      .block
        label Blur: {{filterSettings.blur}} px
        ui-slider(v-model.number.lazy="blur")
    .column
      h2 Editor/Note
      .block
        label Dummy Text:
          input(type="text" placeholder="Write something you want in Markdown")/
      .block
        label Font Color:
          input(type="text" placeholder="#FFFFFF")/
      .block
        label Text Edge:
          input(type="radio" value="" name="text-edge")/ None
          input(type="radio" value="normal" name="text-edge")/ Normal
          input(type="radio" value="Bold" name="text-edge")/ Bold
      .block
        label Edge Color:
          input(type="text" placeholder="#000000")/
</template>

<script>
export default {
  name: 'preferences',
  data () {
    return {
      bgColorSetting      : '#000000',
      bgDisplayStyleLabels: ['cover', 'contain'],
      file                : 'file:///Users/Aqui/Desktop/images/20141121172012.jpg',
      filterSettings      : {
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
    }
  },
  computed: {
    bgColor: {
      get () {
        return localStorage.getItem('bgColorSetting') || this.bgColorSetting
      },
      set (val) {
        this.bgColorSetting = val
        localStorage.setItem('bgColorSetting', val)
      },
    },
    bgDisplayStyle: {
      get () {
        return localStorage.getItem('isCover') ? 'cover' : 'contain'
      },
      set (val) {
        localStorage.setItem('isCover', (val === 'cover'))
      },
    },
    fileUrl: {
      get () {
        return localStorage.getItem('file') || this.file
      },
      set (val) {
        this.file = val
        localStorage.setItem('file', val)
      },
    },
    brightness: {
      get () {
        return localStorage.getItem('filterBrightness') || this.filterSettings.brightness
      },
      set (val) {
        this.filterSettings.brightness = val
        localStorage.setItem('filterBrightness', val)
      },
    },
    contrast: {
      get () {
        return localStorage.getItem('filterContrast') || this.filterSettings.contrast
      },
      set (val) {
        this.filterSettings.contrast = val
        localStorage.setItem('filterContrast', val)
      },
    },
    saturate: {
      get () {
        return localStorage.getItem('filterSaturate') || this.filterSettings.saturate
      },
      set (val) {
        this.filterSettings.saturate = val
        localStorage.setItem('filterSaturate', val)
      },
    },
    grayscale: {
      get () {
        return localStorage.getItem('filterGrayscale') || this.filterSettings.grayscale
      },
      set (val) {
        this.filterSettings.grayscale = val
        localStorage.setItem('filterGrayscale', val)
      },
    },
    sepia: {
      get () {
        return localStorage.getItem('filterSepia') || this.filterSettings.sepia
      },
      set (val) {
        this.filterSettings.sepia = val
        localStorage.setItem('filterSepia', val)
      },
    },
    hueRotate: {
      get () {
        return localStorage.getItem('filterHurRotate') || this.filterSettings['hue-rotate']
      },
      set (val) {
        this.filterSettings['hue-rotate'] = val
        localStorage.setItem('filterHurRotate', val)
      },
    },
    invert: {
      get () {
        return localStorage.getItem('filterInvert') || this.filterSettings.invert
      },
      set (val) {
        this.filterSettings.invert = val
        localStorage.setItem('filterInvert', val)
      },
    },
    opacity: {
      get () {
        return localStorage.getItem('filterOpacity') || this.filterSettings.opacity
      },
      set (val) {
        this.filterSettings.opacity = val
        localStorage.setItem('filterOpacity', val)
      },
    },
    blur: {
      get () {
        return localStorage.getItem('filterBlur') || this.filterSettings.blur
      },
      set (val) {
        this.filterSettings.blur = val
        localStorage.setItem('filterBlur', val)
      },
    },
  },
  mounted () {
    this.file = localStorage.getItem('file') || this.file
    this.isCover = localStorage.getItem('isCover') || this.isCover
    this.bgColorSetting = localStorage.getItem('bgColorSetting') || this.bgColorSetting
    this.filterSettings.brightness = localStorage.getItem('filterBrightness') || this.filterSettings.brightness
    this.filterSettings.contrast = localStorage.getItem('filterContrast') || this.filterSettings.contrast
    this.filterSettings.saturate = localStorage.getItem('filterSaturate') || this.filterSettings.saturate
    this.filterSettings.grayscale = localStorage.getItem('filterGrayscale') || this.filterSettings.grayscale
    this.filterSettings.sepia = localStorage.getItem('filterSepia') || this.filterSettings.sepia
    this.filterSettings['hue-rotate'] = localStorage.getItem('filterHue-rotate') || this.filterSettings['hue-rotate']
    this.filterSettings.invert = localStorage.getItem('filterInvert') || this.filterSettings.invert
    this.filterSettings.opacity = localStorage.getItem('filterOpacity') || this.filterSettings.opacity
    this.filterSettings.blur = localStorage.getItem('filterBlur') || this.filterSettings.blur
  },
}
</script>

<style lang='stylus' scoped>
.preferences
  // height: 61vh
  width: 100vw
  flex-direction: column
  flex-wrap: wrap
.row
  flex-direction: ro
  flex-wrap: wrap
.column
  flex-direction: column
</style>
