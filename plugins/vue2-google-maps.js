import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCMgG-WMQl0cNVoED6GR27F5vIZMX2a2gs",
    libraries: "places"
  }
});
