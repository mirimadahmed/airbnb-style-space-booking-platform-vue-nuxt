import Vue from 'vue'
import Meta from 'vue-meta'
import { createRouter } from './router.js'
import NoSsr from './components/no-ssr.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_bootstrapvue_7421337d from 'nuxt_plugin_bootstrapvue_7421337d' // Source: ./bootstrap-vue.js (mode: 'all')
import nuxt_plugin_fontawesome_b8db358e from 'nuxt_plugin_fontawesome_b8db358e' // Source: ../plugins/fontawesome.js (mode: 'all')
import nuxt_plugin_tawk_e93327c0 from 'nuxt_plugin_tawk_e93327c0' // Source: ../plugins/tawk.js (mode: 'client')
import nuxt_plugin_vue2googlemaps_51da65b7 from 'nuxt_plugin_vue2googlemaps_51da65b7' // Source: ../plugins/vue2-google-maps.js (mode: 'client')
import nuxt_plugin_vuemultiselect_7aa8df7f from 'nuxt_plugin_vuemultiselect_7aa8df7f' // Source: ../plugins/vue-multiselect.js (mode: 'all')
import nuxt_plugin_antd_975cdd78 from 'nuxt_plugin_antd_975cdd78' // Source: ../plugins/antd.js (mode: 'all')
import nuxt_plugin_datepicker_4a26849c from 'nuxt_plugin_datepicker_4a26849c' // Source: ../plugins/datepicker (mode: 'client')
import nuxt_plugin_vuefullcalendar_4a313802 from 'nuxt_plugin_vuefullcalendar_4a313802' // Source: ../plugins/vue-full-calendar (mode: 'client')
import nuxt_plugin_runner_3db9ebb4 from 'nuxt_plugin_runner_3db9ebb4' // Source: ../plugins/runner (mode: 'client')
import nuxt_plugin_ga_fb0a2534 from 'nuxt_plugin_ga_fb0a2534' // Source: ../plugins/ga.js (mode: 'client')
import nuxt_plugin_lingallery_0076bf97 from 'nuxt_plugin_lingallery_0076bf97' // Source: ../plugins/lingallery (mode: 'client')

// Component: <NoSsr>
Vue.component(NoSsr.name, NoSsr)

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>`
Vue.component(Nuxt.name, Nuxt)

// vue-meta configuration
Vue.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    router,
    store,
    nuxt: {
      defaultTransition,
      transitions: [ defaultTransition ],
      setTransitions(transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [ transitions ]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },
      err: null,
      dateErr: null,
      error(err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) ssrContext.nuxt.error = err
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    store,
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) throw new Error('inject(key, value) has no key provided')
    if (typeof value === 'undefined') throw new Error('inject(key, value) has no value provided')
    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) return
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Vue.prototype.hasOwnProperty(key)) {
        Object.defineProperty(Vue.prototype, key, {
          get() {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (typeof nuxt_plugin_bootstrapvue_7421337d === 'function') {
    await nuxt_plugin_bootstrapvue_7421337d(app.context, inject)
  }

  if (typeof nuxt_plugin_fontawesome_b8db358e === 'function') {
    await nuxt_plugin_fontawesome_b8db358e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_tawk_e93327c0 === 'function') {
    await nuxt_plugin_tawk_e93327c0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vue2googlemaps_51da65b7 === 'function') {
    await nuxt_plugin_vue2googlemaps_51da65b7(app.context, inject)
  }

  if (typeof nuxt_plugin_vuemultiselect_7aa8df7f === 'function') {
    await nuxt_plugin_vuemultiselect_7aa8df7f(app.context, inject)
  }

  if (typeof nuxt_plugin_antd_975cdd78 === 'function') {
    await nuxt_plugin_antd_975cdd78(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_datepicker_4a26849c === 'function') {
    await nuxt_plugin_datepicker_4a26849c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuefullcalendar_4a313802 === 'function') {
    await nuxt_plugin_vuefullcalendar_4a313802(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_runner_3db9ebb4 === 'function') {
    await nuxt_plugin_runner_3db9ebb4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_ga_fb0a2534 === 'function') {
    await nuxt_plugin_ga_fb0a2534(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_lingallery_0076bf97 === 'function') {
    await nuxt_plugin_lingallery_0076bf97(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    store,
    router
  }
}

export { createApp, NuxtError }
