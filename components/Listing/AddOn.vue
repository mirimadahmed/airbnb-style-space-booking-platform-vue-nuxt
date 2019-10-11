<template>
  <div class="p-3 mb-4 shadow-sm">
    <div class="row m-0 p-0">
      <div class="col-md-6 m-0 p-0">
        <p class="section-text">{{addOn.name}}</p>
      </div>
      <div class="col-md-6 m-0 p-0 text-center">
        <p class="price">Rs. {{addOn.Pricing[0].rate}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addOn: {
      type: Object,
      require: true
    }
  }
};
</script>

<style scoped>
</style>
