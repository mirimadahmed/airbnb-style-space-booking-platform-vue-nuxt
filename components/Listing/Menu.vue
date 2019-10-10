<template>
  <div class="p-3 mb-4">
    <h3>{{menu.name}}</h3>
    <p>{{menu.description}}</p>
    <p>{{menu.Pricing[0].rate}}</p>
    <p>
      <a-tag v-for="(item, i) in menu.list_items" :key="i" color="blue">{{ item.list_item }}</a-tag>
    </p>
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
