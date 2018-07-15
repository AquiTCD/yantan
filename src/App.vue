<template lang='pug'>
  #app
    transition(name="page")
      router-view.main(:preferences='preferences' @updatePreferences="(key, value) => updatePreferences(key, value)")/
    Menu.menu
</template>

<script>
import Menu from '@/components/Menu.vue'
export default {
  name: 'App',
  components: {
    Menu,
  },
  data() {
    return {
      preferences: {
        bgColor: '#000000',
        bgDisplayStyle: 1,
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
      },
    }
  },
  mounted() {
    this.preferences =
      JSON.parse(localStorage.getItem('preferences')) || this.preferences
  },
  methods: {
    updatePreferences(key, value) {
      const isFilter = /^filters\./
      if (isFilter.test(key)) {
        const filter = key.replace(/^filters\./g, '')
        this.preferences.filters[filter] = value
      } else {
        this.preferences[key] = value
      }
      localStorage.setItem('preferences', JSON.stringify(this.preferences))
    },
  },
}
</script>

<style lang='stylus'>
@import './css/style';

html {
  background: transparent;

  &::-webkit-scrollbar {
    display: none;
  }
}

body {
  width: 100vw;
  height: auto;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

#app {
  background: transparent;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 101;
}

.page-enter-active, .page-leave-active {
  transition: all 0.4s;
}

.page-enter {
  opacity: 0;
}

.page-leave-to {
  opacity: 0;
}

.page-leave, .page-enter-to {
  margin-top: 0;
  margin-bottom: 0;
  opacity: 1;
}
</style>
