<template lang="pug">
  section
    hero
    lead
    concepts
    features
    info
</template>

<script>
import Hero from '~/components/Hero.vue'
import Lead from '~/components/Lead.vue'
import Concepts from '~/components/Concepts.vue'
import Features from '~/components/Features.vue'
import Info from '~/components/Info.vue'

export default {
  components: {
    Hero,
    Lead,
    Concepts,
    Features,
    Info,
  },
  head() {
    return {
      title: this.$t('meta.title'),
      meta: [
        {
          hid: 'charset',
          charset: 'UTF-8',
        },
        {
          hid: 'http-equiv',
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        },
        {
          hid: 'viewport',
          name: 'viewport',
          content: 'width=device-width',
          'initial-scale': 1.0,
          'minimum-scale': 1.0,
        },
        {
          hid: 'format-detection',
          name: 'format-detection',
          content: 'telephone=no,address=no,email=no',
        },
        {
          hid: 'apple-mobile-web-app-capable',
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('meta.title'),
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.$t('meta.title'),
        },
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.description'),
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.$t('meta.image'),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('meta.description'),
        },
        { hid: 'og:url', property: 'og:url', content: this.$t('meta.url') },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: this.$t('meta.title'),
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: this.$t('meta.locale'),
        },
        { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: this.$t('meta.description'),
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: this.$t('meta.image'),
        },
      ],
    }
  },
}
</script>

<style lang="sass" scoped>

</style>
