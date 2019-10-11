<template>
  <div class="p-3 mb-4 shadow-sm">
    <div class="row m-0 p-0">
      <div class="col-md-6 m-0 p-0 text-left">
        <p class="section-text">{{menu.name}}</p>
      </div>
      <div class="col-md-6 m-0 p-0 text-center">
        <p class="price">Rs. {{menu.Pricing[0].rate}}</p>
      </div>
    </div>
    <div>
      <p class="section-sub-text">Menu Items</p>
      <a-tag
        v-for="(item, i) in menu.list_items"
        :key="i"
        color="#E74C3C"
        class="ml-0 mr-1 mb-1 mt-1"
      >{{ item.list_item }}</a-tag>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      require: true
    }
  }
};
</script>

<style scoped>
</style>
