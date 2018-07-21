<template lang="pug">
  nav.navbar(role="navigation" aria-label="main navigation")
    .navbar-menu
      .navbar-brand
        a.navbar-item.logo(href="https://aquitcd.github.io/yantan/")
          // img.icon(src="~/assets/images/icon.png")
          span.appName {{ $t('globals.appName') }}
      .navbar-end
        .navbar-item
          .field.is-grouped
            p.control
              a.bd-tw-button.button(data-social-network="github" data-social-action="Github" data-social-target="https://github.com/AquiTCD/yantan" target="_blank" href="https://github.com/AquiTCD/yantan")
                span.icon
                  i.fab.fa-github
                span {{ $t('navbar.buttons.github') }}
            p.control
              a.button.is-primary(href="https://chrome.google.com/webstore/detail/yantan-newtab-as-markdown/pnaicgpmmccpcpofkpnhephgfoobapna")
                span.icon
                  i.fas.fa-download
                span {{ $t('navbar.buttons.download') }}
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
  .appName
    font-weight: bold
  .logo
    font-family: 'Montserrat Subrayada', sans-serif
    font-size: 2rem
  .icon
    margin-right: 0.5em
</style>
