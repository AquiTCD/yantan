<template lang='pug'>
.background(:style="bgColor")
  img.img.object-fit(:src="bgImage" :style="filter" :class="{cover: isCover}")
</template>

<script>
export default {
  name: 'Background',
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
    filter() {
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
        const value = this.preferences.filters[key].toString().trim()
        filters += `${key}(${value}${unit})`
      })
      return `filter: ${filters};`
    },
    bgColor() {
      return `background-color: ${this.preferences.bgColor.trim()}`
    },
    isCover() {
      return !!Number(this.preferences.bgDisplayStyle)
    },
    bgImage() {
      // transparent image 1x1 as dummy
      const dummy =
        'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
      try {
        const max = this.preferences.bgImages.length - 1
        const randRange = (min, max) =>
          Math.floor(Math.random() * (max - min + 1) + min)
        return this.preferences.bgImages[randRange(0, max)].url
      } catch (err) {
        return dummy
      }
    },
  },
}
</script>

<style lang='stylus' scoped>
.background
  height: 100vh
  position: fixed
  width: 100vw
.overlay
  height: 100%
  width: 100%
.img
  height: 100%
  width: 100%
.object-fit
  object-fit: contain
.object-fit.cover
  object-fit: cover
</style>
