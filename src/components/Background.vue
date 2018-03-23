<template lang='pug'>
.background(:style="bgColor")
  img.img.object-fit(:src="preferences.bgFileUrl" :style="filter" :class="{cover: isCover}")
</template>

<script>
export default {
  name    : 'background',
  props   : ['preferences'],
  computed: {
    filter () {
      let filters = ''
      Object.keys(this.preferences.filters).forEach(key => {
        let unit
        if (key === 'blur') {
          unit = 'px'
        } else if (key === 'hue-rotate') {
          unit = 'deg'
        } else {
          unit = '%'
        }
        let value = this.preferences.filters[key].toString().trim()
        filters += `${key}(${value}${unit})`
      })
      return `filter: ${filters};`
    },
    bgColor () {
      return `background-color: ${this.preferences.bgColor.trim()}`
    },
    isCover () {
      return !!Number(this.preferences.bgDisplayStyle)
    },
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
