<template>
  <div class="company shadow" @click="viewDetails">
    <div class="row image-area">
      <img class="col-md-12 px-3" :src="company.featured_image" />
    </div>
    <div class="row text-left p-3">
      <h3 class="col-md-12 title mb-2">{{ company.name }}</h3>
      <p class="col-md-12 address mb-2">{{ company.address }}</p>
      <div class="col-md-12 mb-2">
        <StarRating :value="70" :noOfRatings="40" />
      </div>
      <div class="col-md-6">
        <button class="details-button" @click="viewDetails">VIEW DETAILS</button>
      </div>
      <div class="col-md-6 row text-right mx-0 px-0">
        <div class="col-md-12 amount">Rs. 500</div>
        <div class="col-md-12 per">/ person</div>
      </div>
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
.amount {
  font-weight: 600;
  font-size: 18px;
  color: #54a0ff;
}
.per {
  font-weight: 400;
  font-size: 14px;
}
.image-area {
  height: 60%;
}
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
