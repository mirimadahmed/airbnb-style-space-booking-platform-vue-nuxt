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
              <div class="col-md-12" v-if="isLoading && spaces.length==0">
                <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
              </div>
              <div class="col-md-12" v-else>
                <b-form-select v-model="selectedSpace" :disabled="isLoading" :options="spaceOptions"></b-form-select>
              </div>
              <div v-if="selectedSpace!=null" class="col-md-12 mt-5">
                <no-ssr>
                  <full-calendar :header="header" defaultView="month" @day-click="dateSelected" />
                </no-ssr>
              </div>
            </div>
          </div>
          <div v-if="slotsGenerated.length>0" class="col-md-6 px-5">
            <div class="row header">
              <div class="col-md-6 text-left p-2">Timing</div>
              <div class="col-md-6 text-right p-2">Status</div>
            </div>
            <div class="row" v-for="(timeSlot, i) in slotsGenerated" :key="i">
              <div
                class="col-md-6 slot-time p-2 text-left"
              >From {{ timeSlot.slot_start }} to {{ timeSlot.slot_end }}</div>
              <div class="col-md-6 p-2 text-right">
                <b-form-checkbox
                  @change="toggleIndeterminate()"
                  v-model="timeSlot.dnr"
                  name="check-button"
                  class="slot-switch"
                  switch
                />
              </div>
               <!-- :disabled="timeSlot.disabled" -->
                 
              <hr class="col-md-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from "~/repository/RepositoryFactory"
const ListingRepository = RepositoryFactory.get("listings");

import {mapGetters} from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      vendor_entity_slots:[],
      spaces:[],
      isLoading: false,
      selectedSpace: null,
      slotsGenerated: [],
      selectedDate: null,
      header: {
        left: "today prev,next",
        center: "title",
        right: ""
      }
    };
  },
  methods: {
    toggleIndeterminate () {
      console.log("swiss")
    },
    async dateSelected(date) {
      this.selectedDate=date;
      this.isLoading = true;
      const { data } = await ListingRepository.getEntitySlots({company_id:this.selectedSpace,selectedDate:this.selectedDate});
      this.slotsGenerated=data
      this.isLoading = false;
    },
    async fetchEntities() {
      this.isLoading = true;
      const { data } = await ListingRepository.getAll(this.user.company_id);
      this.spaces=data
      this.isLoading = false;
    }
  },
  computed : {
    ...mapGetters(['user']),
    spaceOptions () {
			return this.spaces.map(vendor_entity_item => {
				return {
					value: vendor_entity_item.Entity.entity_id,
					text: vendor_entity_item.Entity.name
				}
			})
    }
  },
  created () {
   this.fetchEntities()
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
