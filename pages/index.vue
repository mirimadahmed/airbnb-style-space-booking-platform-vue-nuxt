<template>
  <div>
    <Slider />
    <TagLine />
    <TopVenues />
    <WhyChooseUs />
    <Subscribe />
  </div>
</template>
<script>
import Slider from "../components/Home/Slider";
import TagLine from "../components/Home/TagLine";
import TopVenues from "../components/Home/TopVenues.vue";
import WhyChooseUs from "../components/Home/WhyChooseUs.vue";
import Subscribe from "../components/Home/Subscribe.vue";

export default {
  components: {
    Slider,
    TagLine,
    WhyChooseUs,
    Subscribe,
    TopVenues
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>



