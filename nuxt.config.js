require('dotenv-safe').config()

const pkg = require('./package')

module.exports = {
  mode: 'universal',
  // env:{},
  /*
  ** Headers of the page
  */
  head: {
    title: 'Gentry Way Co., Ltd.',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: 'Product Catalog Website of Gentry Way Co., Ltd.',
      },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.12/css/all.css',
        crossorigin: 'anonymous',
        integrity:
          'sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css',
      },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  // loading: false,

  /*
  ** Global CSS
  */
  css: [
    {src: '@/assets/scss/bulmaCustom.scss'},
    {src: '@/assets/css/global.css'},
    {src: '@/assets/css/pageTransition.css'},
    {src: '@/static/css/fontawesome-all.min.css'},
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{src: '~/plugins/vueMq', ssr: false}],

  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken:
          process.env.NODE_ENV === 'production'
            ? process.env.STORYBLOK_API_PUBLIC_TOKEN
            : process.env.STORYBLOK_API_PREVIEW_TOKEN,
        cacheProvider: 'memory',
      },
    ],
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vue-mq'],
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false,
          },
        },
      },
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
