<template lang='pug'>
.menu
  //- もし編集画面と設定画面のトグル
  router-link(:to="{ name: 'preferences', params: {} }") Preferences
</template>

<script>
// import _ from 'lodash'
// import marked from 'marked'
export default {
  name: 'menu',
}
</script>

<style lang='stylus' scoped>
</style>
