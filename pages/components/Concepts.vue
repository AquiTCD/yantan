<template lang="pug">
  .container.content
    .columns
      .column
        .title {{ $t('concepts.title') }}
    .message.is-warning
      .message-body
        .columns
          .column.content
            .subtitle.has-text-weight-bold {{ $t('concepts.markdown.title') }}
            p.body {{ $t('concepts.markdown.body') }}
          .column.content
            .subtitle.has-text-weight-bold {{ $t('concepts.image.title') }}
            p.body {{ $t('concepts.image.body') }}
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
  .body
    white-space: pre-wrap
</style>
