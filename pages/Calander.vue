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
              <div class="col-md-12 mt-5">
                <no-ssr>
                  <full-calendar :header="header" defaultView="month" @day-click="dateSelected" />
                </no-ssr>
              </div>
            </div>
          </div>
          <div class="col-md-6 px-5">
            <div class="row header">
              <div class="col-md-6 text-left p-2">Timing</div>
              <div class="col-md-6 text-right p-2">Status</div>
            </div>
            <div class="row" v-for="(timeSlot, i) in slotsGenerated" :key="i">
              <div
                class="col-md-6 slot-time p-2 text-left"
              >From {{ timeSlot.from }} to {{ timeSlot.to }}</div>
              <div class="col-md-6 p-2 text-right">
                <b-form-checkbox
                  v-model="timeSlot.status"
                  :disabled="timeSlot.disabled"
                  name="check-button"
                  class="slot-switch"
                  switch
                />
              </div>
              <hr class="col-md-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
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
      selectedDate: null,
      header: {
        left: "today prev,next",
        center: "title",
        right: ""
      }
    };
  },
  methods: {
    dateSelected(date) {
      alert(date);
    }
  }
};
</script>

<style scoped>
.slot-time {
  font-weight: 500;
  font-size: 20px;
}
.header {
  font-weight: 600;
  font-size: 24px;
}
</style>
