<template>
  <div class="row m-0 p-4">
    <div
      class="col-md-4 row m-0 p-2 icon"
      :class="{'border-right' : index !== 2}"
      v-for="(tag, index) in tags"
      :key="index"
    >
      <div class="col-md-12">
        <img :src="tag.icon" />
      </div>
      <div class="col-md-12 heading font-weight-bolder mt-2">{{ tag.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        {
          icon: "https://img.icons8.com/cute-clipart/64/000000/search.png",
          text: "Search"
        },
        {
          icon: "https://img.icons8.com/dusk/64/000000/compare-git.png",
          text: "Compare"
        },
        {
          icon:
            "https://img.icons8.com/cute-clipart/64/000000/checked-radio-button.png",
          text: "Book"
        }
      ]
    };
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .icon {
    border-right: 0px !important;
  }
}
</style>
