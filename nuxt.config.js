export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Spacesly.com - Scan and book your spaces easily.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {src: '/json-serilization.js'},
      {src: '/session.js'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'fullcalendar/dist/fullcalendar.css',
    'vue-multiselect/dist/vue-multiselect.min.css',
    'ant-design-vue/dist/antd.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fontawesome.js',
    { src: '~/plugins/vue2-google-maps.js', ssr: false },
    '~/plugins/vue-multiselect.js',
    '~/plugins/antd.js',
    { src: '~/plugins/datepicker', ssr: false },
    { src: '~/plugins/vue-full-calendar', ssr: false },
    { src: '~/plugins/runner', ssr: false },
    { src: '~plugins/ga.js', ssr: false }

  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
