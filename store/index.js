/* eslint-disable */
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default () => new Vuex.Store({
  state: {
    user: null,
    listings: [],
    conversations: [],
    bookings: [],
    myBookings: [],
    calendar: [],
    systemLists: []
  },
  getters: {
    user: state => state.user,
    isLoggedIn: state => state.user !== null,
    isVendor: state => state.user ? state.user.isVendor === 'True' : false,
    listings: state => state.listings,
    bookings: state => state.bookings,
    myBookings: state => state.myBookings,
  },
  actions: {
    login(context, payload) {
      localStorage.setItem('spacesly-user', JSON.stringify(payload))
      context.commit('login', payload)
    },
    logout(context) {
      localStorage.removeItem('spacesly-user')
      context.commit('logout')
    },
    setSystemLists(context, payload) {
      context.commit('setSystemLists', payload)
    },
    setListings(context, payload) {
      payload.forEach(element => {
        context.commit('addListing', element)
      });
    }
  },
  mutations: {
    login(state, payload) {
      state.user = payload
    },
    logout(state) {
      state.user = null
    },
    setSystemLists(state, payload) {
      state.systemLists = payload
    },
    addListing(state, payload) {
      state.listings.push(payload)
    }
  },
});
