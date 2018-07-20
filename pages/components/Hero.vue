<template lang="pug">
  .hero.is-dark.is-bold.is-fullhd
    .hero-body
      .container
        .columns
          .column
            .column.mainTitle
              h1.title.logo {{ $t('globals.appName') }}
              h2.subtitle.description {{ $t('globals.description') }}
            .column
              change-lang
          .column.mainLogo.has-text-right.is-two-thirds
            img(src="~/assets/image/hero.png")
</template>

<script>
import ChangeLang from '~/components/ChangeLang.vue'

export default {
  components: {
    ChangeLang,
  },
}
</script>

<style lang="sass" scoped>
.logo
  // font-family: $font-family-logo
.description
  white-space: pre-wrap
</style>
