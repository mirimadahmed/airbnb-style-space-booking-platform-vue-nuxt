<template>
  <div class="m-5 p-4 text-left">
    <div class="example" v-if="isLoading">
      <a-spin />
    </div>
    <div v-else>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
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
                <gmap-autocomplete @place_changed="setPlace" v-model="listing.address" class="ant-input ant-input-lg"></gmap-autocomplete>
              </div>
              <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;" />
            </no-ssr>
          </div>
        </div>
        <div v-else-if="current === 1">
          <h1 class="heading">Photos of your space</h1>
          <div class="clearfix">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 3">
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
          <h1 class="heading">Timings</h1>
          <div class="clearfix">
            <a-list
              class="demo-loadmore-list"
              :loading="isLoading"
              itemLayout="horizontal"
              :dataSource="pricings"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a slot="actions" v-if="!item.isActive">activate</a>
                <div>
                  <a-time-picker :minuteStep="15" :secondStep="10" v-model="item.time_start" />
                  <a-time-picker :minuteStep="15" :secondStep="10" v-model="item.time_end" />
                  <a-date-picker v-model="item.effective_date" />
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
      isLoading: false,
      pricings: [
        {
          slot: "per_hour",
          hours_per_shift: "1",
          time_start: moment("20:00"),
          time_end: moment("10:00"),
          effective_date: moment("10/10/2019"),
          isActive: false
        },
        {
          slot: "per_shift",
          hours_per_shift: "4",
          time_start: moment("9:00"),
          time_end: moment("17:00"),
          effective_date: moment("10/10/2019"),
          isActive: false
        },
        {
          slot: "per_day",
          hours_per_shift: "13",
          time_start: moment("9:00"),
          time_end: moment("22:00"),
          effective_date: moment("10/10/2019"),
          isActive: true
        }
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
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
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
        address: null
      },
      permalink: null,
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      customFields: null
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
    openNotificationWithIcon (type,message) {
      this.$notification[type]({
        message: 'Notification',
        description: message,
      });
    },
    async fetch() {
      this.isLoading = true;
      const { data } = await ListingRepository.get(this.permalink);
      this.listing.title = data.Entity.name;
      this.listing.description = data.Entity.description;
      this.listing.address = data.Entity.address;
      this.listing.type_id = data.Entity.type_id;
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
      this.customFields = data.CustomFields;
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
        let obj = {}
        this.$set(obj,'name',this.listing.title)
        this.$set(obj,'company_id',this.user.company_id)
        this.$set(obj,'address',this.listing.address)
        this.$set(obj,'description',this.listing.description)
        this.$set(obj,'type_id',this.listing.type_id)
        this.$set(obj,'longitude',this.center.lng)
        this.$set(obj,'latitude',this.center.lat)
        const { data } = await ListingRepository.newListing({Entity:obj});
      } else {
        this.openNotificationWithIcon('error',"Listing title should be 11 characters"+
        " Description should be 50 characters long")
      }
    },
    async updateAbout() {
      if (this.isAboutValid()) {
        let obj = {}
        this.$set(obj,'name',this.listing.title)
        this.$set(obj,'company_id',this.user.company_id)
        this.$set(obj,'address',this.listing.address)
        this.$set(obj,'description',this.listing.description)
        this.$set(obj,'type_id',this.listing.type_id)
        this.$set(obj,'longitude',this.center.lng)
        this.$set(obj,'latitude',this.center.lat)
        this.$set(obj,'permalink',this.permalink)
        const { data } = await ListingRepository.updateListing({Entity:obj});        // its valid
        console.log(data)
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
      if (this.current === 0) {
        if (this.isNew){
          this.startListing();
        } 
        else{
           this.updateAbout();
        }
        return;
      }
      this.current++;
    },
    prev() {
      this.current--;
    },
    setPlace(place) {
      this.currentPlace = place;
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
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
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
</style>
