<template lang='pug'>
.background(:style="bgColor")
  img.img.object-fit(:src="bgFileUrlSetting" :style="filter" :class="{cover: isCover}")
</template>

<script>
export default {
  name: 'background',
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
    }
  },
  computed: {
    filter () {
      let filters = ''
      Object.keys(this.filterSettings).forEach(key => {
        let unit
        if (key === 'blur') {
          unit = 'px'
        } else if (key === 'hue-rotate') {
          unit = 'deg'
        } else {
          unit = '%'
        }
        let value = this.filterSettings[key].toString().trim()
        filters += `${key}(${value}${unit})`
      })
      return `filter: ${filters};`
    },
    bgColor () {
      return `background-color: ${this.bgColorSetting.trim()}`
    },
    isCover () {
      return !!Number(this.bgDisplayStyleSetting)
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
    this.filterSettings['hue-rotate'] = localStorage.getItem('filterHue-rotate') || this.filterSettings['hue-rotate']
    this.filterSettings.invert = localStorage.getItem('filterInvert') || this.filterSettings.invert
    this.filterSettings.opacity = localStorage.getItem('filterOpacity') || this.filterSettings.opacity
    this.filterSettings.blur = localStorage.getItem('filterBlur') || this.filterSettings.blur
  },
}
</script>

<style lang='stylus' scoped>
.background
  position: fixed
  height: 100vh
  width: 100vw
.overlay
  width: 100%
  height: 100%
.img
  width: 100%
  height: 100%
.object-fit
  object-fit: contain
.object-fit.cover
  object-fit: cover
</style>
