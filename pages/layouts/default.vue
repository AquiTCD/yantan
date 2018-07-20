<template lang="pug">
  div
    navbar
    nuxt
    global-footer
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import GlobalFooter from '~/components/Footer.vue'

export default {
  components: {
    Navbar,
    GlobalFooter,
  },
  methods: {
    path(url) {
      return this.$i18n.locale === 'en' ? url : '/' + this.$i18n.locale + url
    },
  },
}
</script>

<style lang="sass">
</style>
