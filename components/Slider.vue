<template>
  <div>
    <SearchBoxItem />
    <b-carousel :interval="5000" v-model="slide" class="d-none d-md-block">
      <b-carousel-slide
        img-src="https://www.bpimaging.com/assets/uploads/2015/02/restaurant-photography-sunset-grill-exterior.jpg"
      />
      <b-carousel-slide
        img-src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1024/https://www.xoxtravels.com/wp-content/uploads/2019/04/res-1024x682.jpg"
      />
    </b-carousel>
  </div>
</template>
<script>
import SearchBoxItem from "@/components/SearchBoxItem.vue";
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
