<template>
  <div class="row m-0 p-0">
    <div class="col-lg-3 p-5 text-center" v-for="partner in partners" :key="partner">
      <img :src="partner" alt="partner logo here" height="50px" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partners: [
        "https://nicpakistan.pk/wp-content/uploads/2019/04/Artboard-1.png",
        "https://nicpakistan.pk/wp-content/uploads/2019/02/tup_logo.png",
        "https://knct.pk/wp-content/uploads/2019/08/KNCT-COLOR-copy-_-Final.png",
        "https://spacesly.s3.amazonaws.com/image.png"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
