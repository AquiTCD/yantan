module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'YANTAN - Introduction',
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
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/yantan/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.1.1/css/all.css',
        integrity:
          'sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ',
        crossorigin: 'anonymous',
      },
      {
        href:
          'https://fonts.googleapis.com/css?family=Montserrat+Subrayada:700',
        rel: 'stylesheet',
      },
    ],
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
