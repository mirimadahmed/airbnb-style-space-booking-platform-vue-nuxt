<template>
  <div class="filters mx-5 my-4">
    <div class="row">
      <div class="col-sm-1">
        <b-button v-b-modal.modal-1 class="shadow button">Rating</b-button>
      </div>
      <div class="col-sm-1">
        <b-button v-b-modal.modal-2 class="shadow button">Price</b-button>
      </div>
      <!-- <div class="col-xs-2 pull-right">
        <b-form-checkbox v-model="mapOn" name="check-button" class="shadow button" switch/>
      </div>-->

      <b-modal id="modal-1" :hide-header="true" :hide-footer="true">
        <div class="p-3">
          <p class="heading">Rating</p>
          <vue-slider v-model="ratingRange" v-bind="options" />
          <button class="apply-button mt-4" @click="applyRating">APPLY</button>
        </div>
      </b-modal>
      <b-modal id="modal-2" :hide-header="true" :hide-footer="true">
        <div class="p-3">
          <p class="heading">Price</p>
          <vue-slider v-model="priceRange" v-bind="options" />
          <button class="apply-button mt-4" @click="applyPrice">APPLY</button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  components: {
    VueSlider
  },
  data() {
    return {
      mapOn: false,
      ratingRange: [0, 100],
      priceRange: [0, 100],
      options: {
        dotSize: 20,
        min: 0,
        max: 100,
        interval: 1,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0
      }
    };
  },
  methods: {
    applyRating() {
      this.$emit("rating-changed", this.ratingRange);
    },
    applyPrice() {
      this.$emit("price-changed", this.priceRange);
    }
  },
  watch: {
    mapOn() {
      this.$emit("map-changed", this.mapOn);
    }
  }
};
</script>

<style scoped>
.heading {
  font-weight: 500;
  font-size: 20px;
}
.button {
  background: white;
  color: black;
  border-radius: 0px;
  border: 1px solid white;
}
.apply-button {
  background: linear-gradient(#ff4d78, #fa7649);
  border: 1px solid #ff4d78;
  font-size: 12px;
  padding: 10px 20px;
  color: white;
  font-weight: 600;
}
</style>