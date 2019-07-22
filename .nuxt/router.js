import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _4227bb6b = () => interopDefault(import('../pages/About.vue' /* webpackChunkName: "pages/About" */))
const _0363374c = () => interopDefault(import('../pages/Bookings.vue' /* webpackChunkName: "pages/Bookings" */))
const _31fa33c8 = () => interopDefault(import('../pages/Calander.vue' /* webpackChunkName: "pages/Calander" */))
const _727932d2 = () => interopDefault(import('../pages/ChangeLog.vue' /* webpackChunkName: "pages/ChangeLog" */))
const _4af5affe = () => interopDefault(import('../pages/Listings.vue' /* webpackChunkName: "pages/Listings" */))
const _c8205f86 = () => interopDefault(import('../pages/Partners.vue' /* webpackChunkName: "pages/Partners" */))
const _9e612734 = () => interopDefault(import('../pages/Privacy.vue' /* webpackChunkName: "pages/Privacy" */))
const _52f49d43 = () => interopDefault(import('../pages/ResultDetails.vue' /* webpackChunkName: "pages/ResultDetails" */))
const _8ace0fc6 = () => interopDefault(import('../pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _f45bed8c = () => interopDefault(import('../pages/Search.vue' /* webpackChunkName: "pages/Search" */))
const _0bdd5465 = () => interopDefault(import('../pages/Terms.vue' /* webpackChunkName: "pages/Terms" */))
const _2b251360 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _5426e5e1 = () => interopDefault(import('../pages/_permalink/index.vue' /* webpackChunkName: "pages/_permalink/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/About",
      component: _4227bb6b,
      name: "About"
    }, {
      path: "/Bookings",
      component: _0363374c,
      name: "Bookings"
    }, {
      path: "/Calander",
      component: _31fa33c8,
      name: "Calander"
    }, {
      path: "/ChangeLog",
      component: _727932d2,
      name: "ChangeLog"
    }, {
      path: "/Listings",
      component: _4af5affe,
      name: "Listings"
    }, {
      path: "/Partners",
      component: _c8205f86,
      name: "Partners"
    }, {
      path: "/Privacy",
      component: _9e612734,
      name: "Privacy"
    }, {
      path: "/ResultDetails",
      component: _52f49d43,
      name: "ResultDetails"
    }, {
      path: "/search",
      component: _8ace0fc6,
      name: "search"
    }, {
      path: "/Search",
      component: _f45bed8c,
      name: "Search"
    }, {
      path: "/Terms",
      component: _0bdd5465,
      name: "Terms"
    }, {
      path: "/",
      component: _2b251360,
      name: "index"
    }, {
      path: "/:permalink",
      component: _5426e5e1,
      name: "permalink"
    }],

    fallback: false
  })
}
