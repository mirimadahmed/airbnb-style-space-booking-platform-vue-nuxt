import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _22ca975e = () => interopDefault(import('..\\pages\\About.vue' /* webpackChunkName: "pages_About" */))
const _2b7cf279 = () => interopDefault(import('..\\pages\\Bookings.vue' /* webpackChunkName: "pages_Bookings" */))
const _5a13eef5 = () => interopDefault(import('..\\pages\\Calander.vue' /* webpackChunkName: "pages_Calander" */))
const _4d96dd45 = () => interopDefault(import('..\\pages\\ChangeLog.vue' /* webpackChunkName: "pages_ChangeLog" */))
const _02e318e0 = () => interopDefault(import('..\\pages\\eventsia.vue' /* webpackChunkName: "pages_eventsia" */))
const _13f79e90 = () => interopDefault(import('..\\pages\\MySpaces.vue' /* webpackChunkName: "pages_MySpaces" */))
const _77ece92c = () => interopDefault(import('..\\pages\\Partners.vue' /* webpackChunkName: "pages_Partners" */))
const _17a9d0ce = () => interopDefault(import('..\\pages\\Privacy.vue' /* webpackChunkName: "pages_Privacy" */))
const _b5b2f58c = () => interopDefault(import('..\\pages\\Profile.vue' /* webpackChunkName: "pages_Profile" */))
const _56d9bd4a = () => interopDefault(import('..\\pages\\ResetPassword.vue' /* webpackChunkName: "pages_ResetPassword" */))
const _8cfc5394 = () => interopDefault(import('..\\pages\\ResultDetails.vue' /* webpackChunkName: "pages_ResultDetails" */))
const _c8bd61ca = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages_search_index" */))
const _8ceaa8b2 = () => interopDefault(import('..\\pages\\Search.vue' /* webpackChunkName: "pages_Search" */))
const _997b38da = () => interopDefault(import('..\\pages\\Signup_Verification.vue' /* webpackChunkName: "pages_Signup_Verification" */))
const _26ff9f50 = () => interopDefault(import('..\\pages\\Terms.vue' /* webpackChunkName: "pages_Terms" */))
const _5ecee8e0 = () => interopDefault(import('..\\pages\\addspace\\_permalink.vue' /* webpackChunkName: "pages_addspace__permalink" */))
const _69df5b7a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _47d56857 = () => interopDefault(import('..\\pages\\_permalink\\index.vue' /* webpackChunkName: "pages__permalink_index" */))

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
      component: _22ca975e,
      name: "About"
    }, {
      path: "/Bookings",
      component: _2b7cf279,
      name: "Bookings"
    }, {
      path: "/Calander",
      component: _5a13eef5,
      name: "Calander"
    }, {
      path: "/ChangeLog",
      component: _4d96dd45,
      name: "ChangeLog"
    }, {
      path: "/eventsia",
      component: _02e318e0,
      name: "eventsia"
    }, {
      path: "/MySpaces",
      component: _13f79e90,
      name: "MySpaces"
    }, {
      path: "/Partners",
      component: _77ece92c,
      name: "Partners"
    }, {
      path: "/Privacy",
      component: _17a9d0ce,
      name: "Privacy"
    }, {
      path: "/Profile",
      component: _b5b2f58c,
      name: "Profile"
    }, {
      path: "/ResetPassword",
      component: _56d9bd4a,
      name: "ResetPassword"
    }, {
      path: "/ResultDetails",
      component: _8cfc5394,
      name: "ResultDetails"
    }, {
      path: "/search",
      component: _c8bd61ca,
      name: "search"
    }, {
      path: "/Search",
      component: _8ceaa8b2,
      name: "Search"
    }, {
      path: "/Signup_Verification",
      component: _997b38da,
      name: "Signup_Verification"
    }, {
      path: "/Terms",
      component: _26ff9f50,
      name: "Terms"
    }, {
      path: "/addspace/:permalink?",
      component: _5ecee8e0,
      name: "addspace-permalink"
    }, {
      path: "/",
      component: _69df5b7a,
      name: "index"
    }, {
      path: "/:permalink",
      component: _47d56857,
      name: "permalink"
    }],

    fallback: false
  })
}
