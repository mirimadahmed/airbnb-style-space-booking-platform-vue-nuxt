<template>
  <div>
    <HomeSearch />
    <HomePartners />
    <!-- <TagLine /> -->
    <TopVenues />
    <WhyChooseUs />
    <Subscribe />
  </div>
</template>
<script>
import HomeSearch from "../components/Home/HomeSearch";
import HomePartners from "../components/Home/HomePartners";
// import TagLine from "../components/Home/TagLine";
import TopVenues from "../components/Home/TopVenues.vue";
import WhyChooseUs from "../components/Home/WhyChooseUs.vue";
import Subscribe from "../components/Home/Subscribe.vue";

export default {
  components: {
    HomeSearch,
    HomePartners,
    // TagLine,
    WhyChooseUs,
    Subscribe,
    TopVenues
  },
  data() {
    return {};
  },
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Book venue for your next event. Be it Wedding, Party or Corporate function."
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "Wedding halls in Islamabad, Shadi Halls in islamabad, Banquet halls islamabad, Meeting rooms in islamabad, Session hall in islamabad, Marquees islamabad, Marquees in islamabad"
        }
      ]
    };
  }
};
</script>
<style scoped>
</style>



