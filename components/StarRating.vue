<template>
  <div>
    <font-awesome-icon v-for="i in fullStars" :key="i" icon="star" :style="{ color: '#54A0FF' }" />
    <font-awesome-icon v-if="halfStars" icon="star-half" :style="{ color: '#54A0FF' }" />
    <span class="count">({{ noOfRatings }})</span>
  </div>
</template>

<script>
export default {
  props: {
    noOfRatings: {
      type: Number,
      required: true
    },
    numberOfStars: {
      required: false,
      default: 5,
      type: Number
    },
    value: {
      required: false,
      default: 0,
      type: Number,
      validator: value => value >= 0 && value <= 100
    }
  },
  computed: {
    activeRating() {
      let result = (this.value / 100) * this.numberOfStars;
      if (result % 0.5 > 0) {
        result = 0.5 * (Math.floor(result / 0.5) + 1);
      }
      return result;
    },
    disabledStars() {
      return Math.floor(this.numberOfStars - this.activeRating);
    },
    halfStars() {
      return this.activeRating % 1 === 0.5;
    },
    fullStars() {
      return Math.floor(this.activeRating);
    }
  }
};
</script>

<style scoped>
.count {
  font-weight: 300;
  font-size: 12px;
}
</style>
