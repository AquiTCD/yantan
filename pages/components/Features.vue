<template lang="pug">
  .container.content
    .columns
      .column
        .title {{ $t('features.title') }}
    .columns
      .column
        .subtitle.has-text-weight-bold {{ $t('features.feature1.subtitle') }}
        p.body {{ $t('features.feature1.body') }}
          img(src="~/assets/image/1.png")
          br
          img(src="~/assets/image/2.png")
      .column
        .subtitle.has-text-weight-bold {{ $t('features.feature2.subtitle') }}
        p.body {{ $t('features.feature2.body') }}
          img(src="~/assets/image/3.png")
      .column
        .subtitle.has-text-weight-bold {{ $t('features.feature3.subtitle') }}
        p.body {{ $t('features.feature3.body') }}
          img(src="~/assets/image/4.png")
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
  .body
    white-space: pre-wrap
</style>
