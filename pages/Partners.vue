<template>
  <div class="m-5 p-4 text-left">
    <div class="row">
      <div class="col-md-12 mb-4">
        <h1>Partners</h1>
      </div>
      <div class="col-md-12 mb-5">
        <p>We take emmense pride in partnering with these prestegious organizations.</p>
      </div>
      <div class="col-md-6 p-4 text-center" v-for="partner in partners" :key="partner">
        <img :src="partner" class="w-50" alt="partner logo here" />
      </div>
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
