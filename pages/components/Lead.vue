<template lang="pug">
  .container.content
    .columns
      .column
        img(src="~/assets/image/main.png")
        h2.title {{ $t('lead.title') }}
        p.subtitle.body {{ $t('lead.body') }}
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
  .body
    white-space: pre-wrap
</style>
