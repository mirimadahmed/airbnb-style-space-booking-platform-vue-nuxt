<template>
  <div>
    <i v-for="i in fullStars" :key="i" class="fa fa-star" style="color:gold"/>
    <i v-if="halfStars" class="fa fa-star-half" style="color:gold"/>
  </div>
</template>

<script>
export default {
  props: {
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

<style lang="scss" scoped>
</style>