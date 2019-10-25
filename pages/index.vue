<template>
  <div>
    <HomeSearch />
    <!-- <TagLine /> -->
    <TopVenues />
    <WhyChooseUs />
    <Subscribe />
  </div>
</template>
<script>
import HomeSearch from "../components/Home/HomeSearch";
// import TagLine from "../components/Home/TagLine";
import TopVenues from "../components/Home/TopVenues.vue";
import WhyChooseUs from "../components/Home/WhyChooseUs.vue";
import Subscribe from "../components/Home/Subscribe.vue";

export default {
  components: {
    HomeSearch,
    // TagLine,
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



