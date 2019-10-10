<template>
  <div id="app">
    <TopMenu />
    <div class="content">
      <nuxt />
    </div>
    <Footer v-if="showFooter" />
  </div>
</template>
<script>
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";
export default {
  components: {
    TopMenu,
    Footer
  },
  computed: {
    showFooter() {
      return this.$route.name !== "search";
    }
  }
};
</script>
<style>
#app {
  font-family: "Nunito Sans", sans-serif;

  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  text-rendering: optimizeLegibility;
}
.wrapper {
  margin-left: 15px;
  margin-right: 15px;
}
.content {
  min-height: 100vh;
}

.custom-form-control {
  height: 100% !important;
  padding: 0px !important;
  margin: 0px !important;
  border: none !important;
  font-weight: 500;
  padding-left: 10px;
}

.button {
  background: linear-gradient(#ff4d78, #fa7649);
  border: 1px solid #ff4d78;
  font-size: 12px;
  padding: 10px 20px;
  color: white;
  font-weight: 600;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.subscribe-button:after {
  content: "";
  background: linear-gradient(#ff4d78, #fa7649);
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
}

.subscribe-button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}

button:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.full-height {
  height: 100%;
}
.mx-input-wrapper {
  height: 100%;
}
.input-group {
  height: 100%;
}
.mx-input-datepicker .input-group .form-control {
  background: white;
  border: none;
  border-radius: 0px;
  height: 100%;
}

.nav-link-no-border {
  font-weight: 500;
  border: none;
  color: white;
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
  width: 130px;
}
.nav-link-no-border:hover {
  color: white;
  border: none !important;
  border-bottom: none !important;
  height: 100%;
}
.bg-selected {
  background: white;
  color: black;
}

.bg-one {
  background: #9b59b6 !important;
}
.bg-one:hover {
  background: #af15f1 !important;
}

.bg-two {
  background: linear-gradient(#dea22a, #f6b22a) !important;
}
.bg-two:hover {
  background: #f1c40f !important;
}

.bg-three {
  background: #28ad58 !important;
}
.bg-three:hover {
  background: #09f56b !important;
}

.bg-four {
  background: #e74c3c !important;
}
.bg-four:hover {
  background: #fa2e17 !important;
}

.bg-five {
  background: #3498db !important;
}
.bg-five:hover {
  background: #139ffd !important;
}

.lingallery {
  margin: 0px auto;
}
</style>
