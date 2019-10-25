<template>
  <div class="col-md-12 h-100 row m-0 p-0">
    <div class="col-md-5 p-0 input-item">
      <a-select size="large" class="col-md-12" placeholder="Type of Event">
        <a-select-option
          v-for="i in 25"
          :key="(i + 9).toString(36) + i"
        >{{(i + 9).toString(36) + i}}</a-select-option>
      </a-select>
    </div>
    <div class="col-md-4 input-item">
      <a-input-number
        class="number-input-fix"
        size="large"
        :min="1"
        :max="100000"
        placeholder="No. of guests"
      />
    </div>
    <div class="col-md-3 p-0 input-item">
      <a-button class="col-md-12" type="primary" size="large">Primary</a-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .input-item {
    padding: 0px !important;
    margin: 5px 0px;
  }
}
.number-input-fix {
  width: 100% !important;
}
</style>
