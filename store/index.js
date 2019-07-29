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
    login(context,payload) {
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
      context.commit('setListings', payload)
    },
    deleteListing(context, payload) {
      const index = context.state.listings.findIndex(listing => listing.Entity.permalink === payload)
      context.commit('deleteListing', index)
    }
  },
  mutations: {
    login(state,payload) {
      state.user = payload
      Session.set('spacesly-user', payload)
    },
    logout(state) {
      state.user = null
      Session.clear();
    },
    setSystemLists(state, payload) {
      state.systemLists = payload
    },
    setListings(state, payload) {
      state.listings = payload
    },
    deleteListing(state, payload) {
      state.listings.splice(payload, 1)
    }
  },
});
