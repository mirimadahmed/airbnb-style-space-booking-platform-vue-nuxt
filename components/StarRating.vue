<template>
  <div v-if="noOfRatings > 0">
    <a-rate v-model="value" disabled allowHalf />
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
      validator: value => value >= 0 && value <= 5
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
