module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  head: {
    title: 'YANTAN - Introduction',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Yantan - introduction',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    {
      src: '@assets/css/app.sass',
      lang: 'sass',
    },
    {
      src: '@fortawesome/fontawesome-free-webfonts/scss/fontawesome.scss',
      lang: 'scss',
    },
    {
      src: '@fortawesome/fontawesome-free-webfonts/scss/fa-brands.scss',
      lang: 'scss',
    },
    {
      src: '@fortawesome/fontawesome-free-webfonts/scss/fa-regular.scss',
      lang: 'scss',
    },
    {
      src: '@fortawesome/fontawesome-free-webfonts/scss/fa-solid.scss',
      lang: 'scss',
    },
  ],
  build: {
    vendor: ['vue-i18n'],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      const rules = config.module.rules
      rules.push({
        test: /\.ya?ml$/,
        loader: ['json-loader', 'yaml-loader'],
      })
    },
  },
  plugins: ['~/plugins/i18n'],
  router: {
    middleware: 'i18n',
    base: '/yantan',
  },
  generate: {
    routes: ['/', '/ja'],
  },
}
