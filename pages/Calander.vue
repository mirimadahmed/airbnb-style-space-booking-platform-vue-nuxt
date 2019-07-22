<template>
  <div class="m-5 p-4 text-left">
    <div class="row">
      <div class="col-md-12 mb-4">
        <h1>Calander</h1>
      </div>
      <div class="col-md-12 mb-5">
        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">
                <b-form-select v-model="selectedSpace" :options="spaces"></b-form-select>
              </div>
              <div class="col-md-12 mt-5">"Use Calander here"</div>
            </div>
          </div>
          <div class="col-md-6 border-left">
            <div class="row" v-for="(timeSlot, i) in slotsGenerated" :key="i">
              <div class="col-md-6">From {{ timeSlot.from }} to {{ timeSlot.to }}</div>
              <div class="col-md-6">
                <b-form-checkbox
                  v-model="timeSlot.status"
                  :disabled="timeSlot.disabled"
                  name="check-button"
                  switch
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSpace: null,
      spaces: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "Venue 1" },
        { value: "b", text: "Venue 2" },
        { value: "c", text: "Venue 3" }
      ],
      slotsGenerated: [
        { from: "10:00", to: "12:00", status: false, disabled: false },
        { from: "12:00", to: "14:00", status: false, disabled: false },
        { from: "14:00", to: "16:00", status: false, disabled: true }
      ],
      selectedDate: null
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
