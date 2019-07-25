<template>
  <div class="shadow-sm">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="/">
        <img src="/logo.png" width="120px" alt="Spacesly" />
      </b-navbar-brand>
            <!-- href="/listing" -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-button @click="ListSpaceAction()" class="signin-button my-2 my-sm-0 px-4 ml-4 mr-2">List your space</b-button>
          <b-nav-item
            v-if="!isLoggedIn"
            href="#"
            class="ml-3 mr-3"
            @click.prevent="showAuth = true; viewType = 'signup'"
          >Signup</b-nav-item>
          <b-nav-item
            v-if="!isLoggedIn"
            href="#"
            class="ml-3 mr-3"
            @click.prevent="showAuth = true; viewType = 'login'"
          >Login</b-nav-item>
          <b-nav-item href="/calendar" class="ml-3 mr-3" v-if="isLoggedIn && isVendor">Calendar</b-nav-item>
          <b-nav-item href="/listings" class="ml-3 mr-3" v-if="isLoggedIn && isVendor">Listings</b-nav-item>
          <b-nav-item href="/bookings" class="ml-3 mr-3" v-if="isLoggedIn">Bookings</b-nav-item>
          <b-nav-item href="/lists" class="ml-3 mr-3" v-if="isLoggedIn">Lists</b-nav-item>
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            v-if="isLoggedIn"
            :text="user.name"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/support">Support</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Auth :viewType="viewType" :view="showAuth" @closed="showAuth = false" />
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Auth from "../components/Auth";
export default {
  components: {
    Auth
  },
  data() {
    return {
      showAuth: false,
      viewType: ""
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "isVendor", "user"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    ListSpaceAction () {
      if(this.isLoggedIn) {
            this.$router.push({ path: "/listings"  });
      }
      else {
        this.showAuth = true; 
        this.viewType = 'login'
      }
    }
  }
};
</script>


<style scoped>
.menuitem {
  color: black;
}
.signin-button {
  border-radius: 0rem;
  border: 2px solid #ff4d78;
  background: white;
  color: black;
}
.signin-button:hover {
  border: 2px solid #ff4d78;
  background: linear-gradient(#ff4d78, #fa7649);
  color: white;
}
.signin-button:active {
  border: 2px solid #ff4d78;
  background: linear-gradient(#ff4d78, #fa7649);
  color: white;
}
</style>


