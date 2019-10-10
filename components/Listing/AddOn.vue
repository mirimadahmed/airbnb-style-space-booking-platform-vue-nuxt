<template>
  <div class="p-3 mb-4">
    <h3>{{addOn.name}}</h3>
    <p>{{addOn.description}}</p>
    <p>{{addOn.Pricing[0].rate}}</p>
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
