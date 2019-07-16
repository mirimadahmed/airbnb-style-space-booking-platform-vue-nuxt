<template>
  <div class="company shadow">
    <div class="row">
      <img class="col-md-12 px-3" :src="company.featured_image" />
    </div>
    <div class="row text-left p-3">
      <h3 class="col-md-12 title">{{ company.name }}</h3>
      <p class="col-md-12 address">{{ company.address }}</p>
      <!-- <p class="col-md-12">
        <StarRating v-model="company.rating"/>
      </p>-->
      <p class="col-md-6">
        <button class="details-button" @click="viewDetails">VIEW DETAILS</button>
      </p>
      <!-- <p class="col-md-6">{{ company.rate.amount }} per {{ company.rate.per }}</p> -->
    </div>
  </div>
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
      this.$router.push({ path: "/" + this.company.permalink });
    }
  }
};
</script>

<style scoped>
.company {
  width: 100%;
  height: 420px;
}
.title {
  font-weight: 500;
  font-size: 20px;
}
.address {
  font-weight: 300;
  font-size: 12px;
}
.details-button {
  background: linear-gradient(#ff4d78, #fa7649);
  border: 1px solid #ff4d78;
  font-size: 12px;
  padding: 10px 20px;
  color: white;
  font-weight: 600;
}
</style>
