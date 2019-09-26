import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _59e3c1d8 = () => interopDefault(import('..\\pages\\About.vue' /* webpackChunkName: "pages_About" */))
const _0512fdbf = () => interopDefault(import('..\\pages\\Bookings.vue' /* webpackChunkName: "pages_Bookings" */))
const _33a9fa3b = () => interopDefault(import('..\\pages\\Calander.vue' /* webpackChunkName: "pages_Calander" */))
const _b27b8a82 = () => interopDefault(import('..\\pages\\ChangeLog.vue' /* webpackChunkName: "pages_ChangeLog" */))
const _4fb70254 = () => interopDefault(import('..\\pages\\eventsia.vue' /* webpackChunkName: "pages_eventsia" */))
const _60cb8804 = () => interopDefault(import('..\\pages\\MySpaces.vue' /* webpackChunkName: "pages_MySpaces" */))
const _c4c0d2a0 = () => interopDefault(import('..\\pages\\Partners.vue' /* webpackChunkName: "pages_Partners" */))
const _6cb8e8da = () => interopDefault(import('..\\pages\\Privacy.vue' /* webpackChunkName: "pages_Privacy" */))
const _7a9ef934 = () => interopDefault(import('..\\pages\\Profile.vue' /* webpackChunkName: "pages_Profile" */))
const _75019c56 = () => interopDefault(import('..\\pages\\ResetPassword.vue' /* webpackChunkName: "pages_ResetPassword" */))
const _ab2432a0 = () => interopDefault(import('..\\pages\\ResultDetails.vue' /* webpackChunkName: "pages_ResultDetails" */))
const _e6e540d6 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages_search_index" */))
const _6596d06d = () => interopDefault(import('..\\pages\\Search.vue' /* webpackChunkName: "pages_Search" */))
const _46ca9ee6 = () => interopDefault(import('..\\pages\\Signup_Verification.vue' /* webpackChunkName: "pages_Signup_Verification" */))
const _23995ad2 = () => interopDefault(import('..\\pages\\Terms.vue' /* webpackChunkName: "pages_Terms" */))
const _5b6c4454 = () => interopDefault(import('..\\pages\\addspace\\_permalink.vue' /* webpackChunkName: "pages_addspace__permalink" */))
const _02297cbd = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _6a1ea85e = () => interopDefault(import('..\\pages\\_permalink\\index.vue' /* webpackChunkName: "pages__permalink_index" */))

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
      component: _59e3c1d8,
      name: "About"
    }, {
      path: "/Bookings",
      component: _0512fdbf,
      name: "Bookings"
    }, {
      path: "/Calander",
      component: _33a9fa3b,
      name: "Calander"
    }, {
      path: "/ChangeLog",
      component: _b27b8a82,
      name: "ChangeLog"
    }, {
      path: "/eventsia",
      component: _4fb70254,
      name: "eventsia"
    }, {
      path: "/MySpaces",
      component: _60cb8804,
      name: "MySpaces"
    }, {
      path: "/Partners",
      component: _c4c0d2a0,
      name: "Partners"
    }, {
      path: "/Privacy",
      component: _6cb8e8da,
      name: "Privacy"
    }, {
      path: "/Profile",
      component: _7a9ef934,
      name: "Profile"
    }, {
      path: "/ResetPassword",
      component: _75019c56,
      name: "ResetPassword"
    }, {
      path: "/ResultDetails",
      component: _ab2432a0,
      name: "ResultDetails"
    }, {
      path: "/search",
      component: _e6e540d6,
      name: "search"
    }, {
      path: "/Search",
      component: _6596d06d,
      name: "Search"
    }, {
      path: "/Signup_Verification",
      component: _46ca9ee6,
      name: "Signup_Verification"
    }, {
      path: "/Terms",
      component: _23995ad2,
      name: "Terms"
    }, {
      path: "/addspace/:permalink?",
      component: _5b6c4454,
      name: "addspace-permalink"
    }, {
      path: "/",
      component: _02297cbd,
      name: "index"
    }, {
      path: "/:permalink",
      component: _6a1ea85e,
      name: "permalink"
    }],

    fallback: false
  })
}
