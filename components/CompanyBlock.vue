<template>
  <b-card
    @click="viewDetails"
    :img-src="company.featured_image"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2 text-left pointer-setup"
    border-variant="light"
  >
    <b-card-title class="title">{{company.name}}</b-card-title>
    <b-card-text class="address">
      <i class="fa fa-map-marker" />
      {{ company.address }}
      <StarRating :value="3.5" :noOfRatings="40" />
    </b-card-text>
  </b-card>
</template>

<script>
import StarRating from "./StarRating.vue";
export default {
  components: {
    StarRating
  },
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewDetails() {
      let routeData = this.$router.resolve({
        path: "/" + this.company.permalink
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped>
.pointer-setup {
  cursor: pointer;
}
.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  font-family: Avenir-Heavy, "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.address {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
