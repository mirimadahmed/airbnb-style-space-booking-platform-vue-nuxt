<template>
  <div id="app">
    <TopMenu />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";
export default {
  components: {
    TopMenu,
    Footer
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.wrapper {
  margin-left: 15px;
  margin-right: 15px;
}

.custom-form-control {
  height: 100% !important;
  padding: 0px !important;
  margin: 0px !important;
  border: none !important;
  font-weight: 500;
  padding-left: 10px;
}

.full-height {
  height: 100%;
}
.vdp-datepicker {
  height: 100%;
}
.vdp-datepicker .input-group {
  height: 100%;
}
.vdp-datepicker .input-group .form-control {
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
  width: 100px;
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
  background: #8e44ad !important;
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
  background: #27ae60 !important;
}

.bg-four {
  background: #e74c3c !important;
}
.bg-four:hover {
  background: #c0392b !important;
}

.bg-five {
  background: #3498db !important;
}
.bg-five:hover {
  background: #2980b9 !important;
}
</style>
