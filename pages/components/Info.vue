<template lang="pug">
  .container.last-section.content
    .columns.is-centered
      .column.has-text-centered
        .title {{ $t('info.title') }}
        a.button.is-success(href="https://chrome.google.com/webstore/detail/yantan-newtab-as-markdown/pnaicgpmmccpcpofkpnhephgfoobapna") {{ $t('info.download') }}
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
  .last-section
    padding-bottom: 3em
</style>
