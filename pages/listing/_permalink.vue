<template>
  <div class="m-5 p-4 text-left">
    <div class="text-center" v-if="isLoading">
      <a-spin />
    </div>
    <div v-else>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div  class="steps-content">
        <div v-if="current === 0">
          <h1 class="heading">About your space</h1>
          <div v-if="isNew">
            <h1 class="second-heading">What's your space is for?</h1>
            <a-radio-group v-model="listing.type_id" size="large" @change="getCusotmFields">
              <a-radio-button
                v-for="(type, i) in typeOptions"
                :value="type.value"
                :key="i"
              >{{ type.label }}</a-radio-button>
            </a-radio-group>
          </div>
          <div class="mt-4 col-md-8 px-0">
            <a-input placeholder="Give your listing a title" size="large" v-model="listing.title" />
          </div>
          <div class="mt-4 col-md-8 px-0">
            <a-textarea
              placeholder="Give your listing a great description"
              :rows="4"
              v-model="listing.description"
            />
          </div>
          <div class="mt-4 col-md-8 px-0">
            <no-ssr>
              <div class="mb-4">
                <h1 class="second-heading">Locate your space</h1>
                <gmap-autocomplete @place_changed="setPlace"   class="ant-input ant-input-lg"></gmap-autocomplete>
              </div>
              <gmap-map :center="center" :zoom="20" style="width:100%;  height: 400px;" >
                <gmap-marker
                  @drag="updateCoordinates"
                  @dragend="updateCoordinates"
                  v-if="currentPlace"
                  :position="currentPlace"
                  :clickable="false"
                  :draggable="true"
                />
              </gmap-map>
            </no-ssr>
          </div>
        </div>
        <div v-else-if="current === 1">
          <h1 class="heading">Photos of your space</h1>
          <div class="clearfix">
            <a-upload
              listType="picture-card"
              :fileList="fileList"
              :multiple="true"
              @preview="handlePreview"
              :beforeUpload="beforeUpload">
              <div>
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </div>
        <div v-else-if="current === 2">
          <div v-for="(group, i) in Object.keys(customFields)" :key="i" class="row">
            <h1 class="heading col-md-12 my-2">{{ group }}</h1>
            <div v-for="(field, j) in customFields[group]" :key="j" class="col-md-6">
              <div v-if="field.field_type === 'boolean'" class="row my-2">
                <div
                  class="col-md-6"
                >{{ field.form_message || field.form_placeholder || field.form_name || field.name }}</div>
                <div class="col-md-6">
                  <a-switch v-model="field.value" size="large">
                    <a-icon type="check" slot="checkedChildren" />
                    <a-icon type="close" slot="unCheckedChildren" />
                  </a-switch>
                </div>
              </div>
              <div v-else-if="field.field_type === 'text'" class="row my-2">
                <div
                  class="col-md-6"
                >{{ field.form_message || field.form_placeholder || field.form_name || field.name }}</div>
                <div class="col-md-6">
                  <a-input v-model="field.value" :placeholder="field.form_placeholder" />
                </div>
              </div>
              <div v-else-if="field.field_type === 'number'" class="row my-2">
                <div
                  class="col-md-6"
                >{{ field.form_message || field.form_placeholder || field.form_name || field.name }}</div>
                <div class="col-md-6">
                  <a-input-number v-model="field.value" :placeholder="field.form_placeholder" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="current === 3">
           <div class="row">
                <div class="col-md-6">
                  <h1 class="heading">Timings</h1>
              </div>
                <div class="col-md-6">
                  <button class="button" @click="showModal" style="margin-left: 8px" >Add New</button>
                </div>
            </div>
              <div class="clearfix">
                <a-list
                  class="demo-loadmore-list"
                  :loading="isLoading"
                  itemLayout="horizontal"
                  :dataSource="pricings"
                >
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="activateSlots(item.timings_conf_id)" v-if="!item.is_active">activate</a>
                    <div>
                      <a-time-picker :minuteStep="15" :secondStep="10" v-model="item.time_start" />
                      <a-time-picker :minuteStep="15" :secondStep="10" v-model="item.time_end" />
                      <!-- <a-date-picker v-model="item.effective_date" /> -->
                      <a-radio-group v-model="item.slot">
                        <a-radio-button value="per_day">Per day</a-radio-button>
                        <a-radio-button value="per_shift">Per shift</a-radio-button>
                        <a-radio-button value="per_hour">Per hour</a-radio-button>
                      </a-radio-group>
                      <a-input-number
                        v-if="item.slot === 'per_shift'"
                        :min="2"
                        :max="10"
                        v-model="item.hours_per_shift"
                      />
                    </div>
                  </a-list-item>
                </a-list>
              </div>
              <h1 class="heading mt-4">Pricing</h1>
        </div>
        <div v-else-if="current === 4">
          <h1 class="heading">Finally</h1>
        </div>
      </div>
      <div class="steps-action col-md-8 text-right">
        <button
          class="button"
          v-if="current == steps.length - 1"
          type="primary"
          @click="$message.success('Processing complete!')"
        >Done</button>
        <button class="button" v-if="current>0" style="margin-left: 8px" @click="prev">Previous</button>
        <button
          class="button"
          v-if="current < steps.length - 1"
          type="primary"
          @click="next"
        >{{ current === 0 && isNew ? 'Start' : 'Next'}}</button>
      </div>
        <a-modal @ok="newTiming"
        :width="620"
        title="New Timing"
        v-model="visible">
            <div class="row new-time">
              <div class="col-md-6">
                <h6 >Opening Time</h6>
              </div>
              <div class="col-md-6">
                <a-time-picker v-model="newTime.time_start" :minuteStep="15" :secondStep="10"/>
               </div>
            </div>
            <div class="row new-time">
              <div class="col-md-6">
                <h6>Close time</h6>
               </div>
              <div class="col-md-6">
                <a-time-picker v-model="newTime.time_end" :minuteStep="15" :secondStep="10"  />
              </div>
            </div>
            <div class="row new-time">
              <div class="col-md-6">
                <h6>Date</h6>
              </div>
              <div class="col-md-6">
                <a-date-picker  />
              </div>
            </div>
            <div class="row new-time">
              <div class="col-md-3 .no-pad">
                <h6>Space Allocation</h6>
              </div>
              <div class="col-md-7 .no-pad">
                  <a-radio-group v-model="newTime.slot">
                    <a-radio-button value="per_day">Per day</a-radio-button>
                    <a-radio-button value="per_shift">Per shift</a-radio-button>
                    <a-radio-button value="per_hour">Per hour</a-radio-button>
                  </a-radio-group>
              </div>
              <div class="col-md-2 no-pad">
                <a-input-number
                v-if="newTime.slot === 'per_shift'"
                :min="2"
                v-model="newTime.no_of_shift"
                placeholder="Capacity"
                :max="10"
              />
              </div>
            </div>
            

              <!-- <a-time-picker :minuteStep="15" :secondStep="10"  />
              <a-time-picker :minuteStep="15" :secondStep="10"  />
              <a-date-picker  />
              <a-radio-group >
                <a-radio-button value="per_day">Per day</a-radio-button>
                <a-radio-button value="per_shift">Per shift</a-radio-button>
                <a-radio-button value="per_hour">Per hour</a-radio-button>
              </a-radio-group>
              <a-input-number
                v-if="item.slot === 'per_shift'"
                :min="2"
                :max="10"
              /> -->
        </a-modal>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
import { mapGetters,mapState } from "vuex";

const ListingRepository = RepositoryFactory.get("listings");
export default {
  middleware: "auth",
  data() {
    return {
      newTime:{
        slot:'per_hour',
        time_start:null,
        time_end:null,
        hours_per_shift:null,
        no_of_shift:null
      },
      visible: false,
      isLoading: false,
      pricings: [
        // {
        //   slot: "per_hour",
        //   hours_per_shift: "1",
        //   time_start: moment("20:00"),
        //   time_end: moment("10:00"),
        //   effective_date: moment("10/10/2019"),
        //   isActive: false
        // },
        // {
        //   slot: "per_shift",
        //   hours_per_shift: "4",
        //   time_start: moment("9:00"),
        //   time_end: moment("17:00"),
        //   effective_date: moment("10/10/2019"),
        //   isActive: false
        // },
        // {
        //   slot: "per_day",
        //   hours_per_shift: "13",
        //   time_start: moment("9:00"),
        //   time_end: moment("22:00"),
        //   effective_date: moment("10/10/2019"),
        //   isActive: true
        // }
      ],
      steps: [
        {
          title: "About",
          content: "First-content"
        },
        {
          title: "Gallery",
          content: "Second-content"
        },
        {
          title: "Offerings",
          content: "Third-content"
        },
        {
          title: "Pricing",
          content: "Last-content"
        },
        {
          title: "Done",
          content: "Last-content"
        }
      ],
      previewVisible: false,
      previewImage: "",
      fileList: [
        // {
        //   uid: "-1",
        //   name: "xxx.png",
        //   status: "done",
        //   url:
        //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        // }
      ],
      current: 0,
      typeOptions: [
        {
          label: "Wedding",
          value: 1
        },
        {
          label: "Party",
          value: 2
        },
        {
          label: "Corporate",
          value: 3
        },
        {
          label: "Sports",
          value: 4
        },
        {
          label: "Production",
          value: 5
        }
      ],
      listing: {
        title: "",
        type_id: null,
        description: "",
        address: null,
        entity_id:null
      },
      permalink: null,
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      customFields: null,
      previous_length:null
    };
  },
  created() {
    this.permalink = this.$route.params.permalink;
    if (this.permalink) {
      this.fetch();
    }
  },
  computed: {
   ...mapGetters(["user"]),
    isNew() {
      return this.permalink === undefined;
    }
  },
  methods: {
    async activateSlots (config_id) {
       const { data } = await ListingRepository.changeTimeSlots({config_id:config_id,entity_id:this.listing.entity_id});
       this.fetch()
    },
    async newTiming() {
        if (this.newTime.slot == "per_hour") {
          this.newTime.hours_per_shift = 1;
        }
        else if (this.newTime.slot == "per_day") {
        var res = moment(this.newTime.time_start).format("HH:mm:ss").split(":",2)//this.open_time_hour.split(":",2);
        var start_hour=res[0]
        var res = moment(this.newTime.time_end).format("HH:mm:ss").split(":",2)//this.close_time_hour.split(":",2);
        var end_hour=res[0]
        var workinghours=end_hour-start_hour
        this.newTime.hours_per_shift = workinghours
        } 
        else if (this.newTime.slot == "per_shift") {
          var res = moment(this.newTime.time_start).format("HH:mm:ss").split(":",2)//this.open_time_hour.split(":",2);
          var start_hour=res[0]
          var res = moment(this.newTime.time_end).format("HH:mm:ss").split(":",2)//this.close_time_hour.split(":",2);
          var end_hour=res[0]
          var workinghours=end_hour-start_hour
          var totalshifts=this.newTime.no_of_shift
          this.newTime.hours_per_shift = workinghours/totalshifts;
        }
        let obj={time_start:moment(this.newTime.time_start).format("HH:mm:ss")+'.00',
        time_end:moment(this.newTime.time_end).format("HH:mm:ss")+'.00',
        slot:this.newTime.slot,
        hours_per_shift:this.newTime.hours_per_shift,
        entity_id:this.listing.entity_id}
        const { data } = await ListingRepository.createTimeSlots(obj);
        if(data.success){
        this.openNotificationWithIcon('success',data.user_message)
        this.fetch();

        }
        else{
        this.openNotificationWithIcon('error',data.user_message)
        }
        this.hideModal()


    },
    showModal() {
      this.visible = true
    },
    hideModal(){
      this.visible = false
    },
    handleOk(e) {
      this.visible = false
    },
    openNotificationWithIcon (type,message) {
      this.$notification[type]({
        message: 'Notification',
        description: message,
      });
    },
    async fetch() {
      this.isLoading = true;
      const { data } = await ListingRepository.get(this.permalink);
      this.pricings=data.Entity.timings_conf
      console.log(this.pricings)
      this.listing.title = data.Entity.name;
      this.listing.description = data.Entity.description;
      this.listing.address = data.Entity.address;
      this.listing.type_id = data.Entity.type_id;
      this.listing.entity_id=data.Entity.entity_id
      this.currentPlace = {
        lat: data.Entity.latitude,
        lng: data.Entity.longitude
      };
      this.center = this.currentPlace;
      this.fileList = data.Entity.images.map((image, i) => ({
        uid: i,
        name: image,
        status: "done",
        url: image
      }));
      this.previous_length=data.Entity.images.length
      this.customFields = data.CustomFields;
      for(var i=0;i<this.pricings.length;i++){
        this.pricings[i].time_start=moment(this.pricings[i].time_start,'HH:mm:ss')
        this.pricings[i].time_end=moment(this.pricings[i].time_end,'HH:mm:ss')

      }
      this.isLoading = false;
    },
    async getCusotmFields() {
      this.isLoading = true;
      const { data } = await ListingRepository.getCustomFields(
        this.listing.type_id
      );
      this.isLoading = false;
      this.customFields = data;
    },
    isAboutValid() {
      return (
        this.listing.type_id !== null &&
        this.listing.title.length > 10 &&  
        this.listing.description.length > 50 &&
        this.listing.address !== null
      );
    },
    async startListing() {
      if (this.isAboutValid()) {
        this.isLoading=true;
        let obj = {
          name:this.listing.title,
          company_id:this.user.company_id,
          address:this.listing.address,
          description:this.listing.description,
          type_id:this.listing.type_id,
          longitude:this.center.lng,
          latitude:this.center.lat}
        const { data } = await ListingRepository.newListing({Entity:obj});
        this.isLoading=false
        this.listing.entity_id=data.entity_id
        this.permalink=data.permalink
        if(data.success) {
           this.openNotificationWithIcon('success',data.user_message)
           this.current++
        }
        else {
           this.openNotificationWithIcon('error',data.user_message)
        }
      } else {
        this.openNotificationWithIcon('error',"Listing title should be 11 characters"+
        " Description should be 50 characters long")
      }
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false;
    },
    async handleUpload() {
      if(this.previous_length<this.fileList.length){
        let temp_arr=[]
        for(var i=this.previous_length;i<this.fileList.length;i++) {
          temp_arr.push(this.fileList[i])
        }
        let img_obj={}
        this.$set(img_obj, "files", temp_arr);
        this.$set(img_obj, "entity_id", this.listing.entity_id);
        this.$set(img_obj, "file_type", "images");
        let { data } = await ListingRepository.uploadEntityGalleryImages(img_obj);
        if(data.success) {
          this.openNotificationWithIcon('success',data.user_message)
          this.current++;
        }
        else {
          this.openNotificationWithIcon('error',data.user_message)

        }
      }
      else {
          this.current++;
      }
      

    },
    async updateCustomFields () {
      let obj = {
          name:this.listing.title,
          company_id:this.user.company_id,
          address:this.listing.address,
          description:this.listing.description,
          type_id:this.listing.type_id,
          longitude:this.center.lng,
          permalink:this.permalink,
          latitude:this.center.lat}
          let { data } = await ListingRepository.update_entity({Entity:obj,CustomFields:this.customFields});
          if(data.success) {
           this.openNotificationWithIcon('success',data.user_message)
            this.current++;
          }
    },
    async updateAbout() {
      if (this.isAboutValid()) {
        let obj = {
          name:this.listing.title,
          company_id:this.user.company_id,
          address:this.listing.address,
          description:this.listing.description,
          type_id:this.listing.type_id,
          longitude:this.center.lng,
          latitude:this.center.lat,
          permalink:this.permalink
          }
        const { data } = await ListingRepository.updateListing({Entity:obj})
        if(data.success){
           this.openNotificationWithIcon('success',data.user_message)
           this.current++
        }
        else {
           this.openNotificationWithIcon('error',data.user_message)
        }

      } else {
        this.openNotificationWithIcon('error',"Listing title should be 11 characters"+
        " Description should be 50 characters long")
      }
    },
    next() {
        if (this.isNew) {
          if(this.current==0){
          this.startListing();
          }
            
        }
        else{
          if(this.current==0) {
           this.updateAbout();
          }
          else if(this.current==1) {
            this.handleUpload()
          }
          else if(this.current==2) {
            this.updateCustomFields()
          }
        } 
    },
    updateCoordinates (location) {
      this.center = {
          lat: location.latLng.lat(),
          lng: location.latLng.lng()
        };
      this.currentPlace = {lat:location.latLng.lat(),lng:location.latLng.lng()};
    },
    prev() {
      this.current--;
    },
    setPlace(place) {
      this.currentPlace = {lat:place.geometry.location.lat(),lng:place.geometry.location.lng()};
      this.center.lat=place.geometry.location.lat()
      this.center.lng=place.geometry.location.lng()
      this.listing.address=place.formatted_address
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    }
  },
  mounted() {
    this.geolocate();
  }
};
</script>

<style scoped>
.heading {
  font-weight: 600;
  font-size: 24px;
}
.second-heading {
  font-weight: 500;
  font-size: 14px;
}
.form-control:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.input-element {
  font-weight: 500;
  font-size: 18px;
  background: none;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 0px;
  text-align: center;
}
.steps-content {
  margin-top: 16px;
  min-height: 200px;
  text-align: left;
  padding-top: 20px;
}

.steps-action {
  margin-top: 24px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.new-time{
  margin-top:10px;
}

.no-pad{
  padding-right:0;
  padding-left:0;
}
</style>
