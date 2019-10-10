<template>
  <div>
    <Slider />
    <TopVenues />
    <WhyChooseUs />
    <Subscribe />
    <Links />
  </div>
</template>
<script>
import Slider from "../components/Home/Slider";
import TopVenues from "../components/Home/TopVenues.vue";
import WhyChooseUs from "../components/Home/WhyChooseUs.vue";
import Subscribe from "../components/Home/Subscribe.vue";
import Links from "../components/Home/Links.vue";

export default {
  components: {
    Slider,
    WhyChooseUs,
    Subscribe,
    Links,
    TopVenues
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>



