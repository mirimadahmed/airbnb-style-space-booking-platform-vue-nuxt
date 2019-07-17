<template>
  <div class="m-5 p-4">
    <div class="row">
      <h3>My Bookings</h3>
      <div class="col-md-12 bg-light">
        <div class="row" v-if="myBookings.length === 0">
          <div class="col-md-12 my-2">Search and book a space.</div>
        </div>
        <div class="row" v-for="(booking, i) in myBookings" :key="i">
          <div class="col-md-12 my-2">Booking 1</div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <h3>Bookings on my listings</h3>
      <div class="col-md-12 bg-light">
        <div class="row" v-if="bookings.length === 0">
          <div class="col-md-12 my-2">No new booking on your space(s).</div>
        </div>
        <div class="row" v-for="(booking, i) in bookings" :key="i">
          <div class="col-md-12 my-2">Booking 1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["bookings", "myBookings"])
  }
};
</script>

<style lang="scss" scoped>
</style>
