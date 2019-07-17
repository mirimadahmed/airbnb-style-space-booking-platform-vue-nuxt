<template>
  <div>
    <Slider />
    <WhyChooseUs />
    <Subscribe />
  </div>
</template>
<script>
import Slider from "../components/Slider";
import WhyChooseUs from "../components/WhyChooseUs.vue";
import Subscribe from "../components/Subscribe.vue";

export default {
  auth: false,
  components: {
    Slider,
    WhyChooseUs,
    Subscribe
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
</style>



