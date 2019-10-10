<template>
  <div>
    <Slider />
    <TopVeneus />
    <WhyChooseUs />
    <Subscribe />
  </div>
</template>
<script>
import Slider from "../components/Slider";
import TopVeneus from "../components/TopVeneus.vue";
import WhyChooseUs from "../components/WhyChooseUs.vue";
import Subscribe from "../components/Subscribe.vue";

export default {
  components: {
    Slider,
    WhyChooseUs,
    Subscribe,
    TopVeneus
  },
  data() {
    return {};
  },
  methods: {},
  head() {
    return {
      title: "Spacesly - Book Spaces Easily",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Spacesly - Book Spaces Easily"
        }
      ]
    };
  }
};
</script>
<style scoped>
</style>



