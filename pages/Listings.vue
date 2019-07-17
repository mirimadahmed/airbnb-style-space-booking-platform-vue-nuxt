<template>
  <div class="m-5 p-4">
    <div class="row">
      <h3>My Listings</h3>
      <div class="col-md-12 bg-light">
        <div class="row" v-if="listings.length === 0">
          <div class="col-md-12 my-2">Create a listing now.</div>
        </div>
        <div class="row" v-for="(listing, i) in listings" :key="i">
          <div class="col-md-12 my-2">Listing 1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["listings"])
  }
};
</script>

<style lang="scss" scoped>
</style>
