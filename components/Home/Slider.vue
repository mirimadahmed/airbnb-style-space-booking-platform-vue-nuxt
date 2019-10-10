<template>
  <div>
    <SearchBoxItem />
    <b-carousel :interval="5000" v-model="slide" class="d-none d-md-block">
      <b-carousel-slide
        img-src="https://cache.marriott.com/marriottassets/marriott/HYDMC/hydmc-reception-0062-hor-feat.jpg?downsize=1440px&fbclid=IwAR1bXcQVC5WoyAk98YVyX4f3xRfOpc5Mm-l6Xq8UyBeNLA3HKTwm102S8OA"
      />
      <b-carousel-slide
        img-src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1024/https://www.xoxtravels.com/wp-content/uploads/2019/04/res-1024x682.jpg"
      />
    </b-carousel>
  </div>
</template>
<script>
import SearchBoxItem from "./SearchBoxItem.vue";
export default {
  components: {
    SearchBoxItem
  },
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    }
  }
};
</script>
<style>
.carousel-inner {
  height: 70vh;
}
</style>
