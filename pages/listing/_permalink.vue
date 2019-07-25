<template>
  <div class="m-5 p-4 text-left">
    <div>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <div v-if="current === 0">
          <h1 class="heading">About your space</h1>
          <div>
            <h1 class="second-heading">What's your space is for?</h1>
            <a-radio-group v-model="listing.type" size="large">
              <a-radio-button v-for="(type, i) in typeOptions" :value="type" :key="i">{{ type }}</a-radio-button>
            </a-radio-group>
          </div>
          <div class="mt-4 col-md-8 px-0">
            <a-input placeholder="Give your listing a title" size="large" v-model="listing.title" />
          </div>
          <div class="mt-4 col-md-8 px-0">
            <a-textarea placeholder="Give your listing a great description" :rows="4" />
          </div>
          <div class="mt-4 col-md-8 px-0">
            <no-ssr>
              <div class="mb-4">
                <h1 class="second-heading">Locate your space</h1>
                <gmap-autocomplete @place_changed="setPlace" class="ant-input ant-input-lg"></gmap-autocomplete>
              </div>
              <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
                <gmap-marker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  @click="center=m.position"
                ></gmap-marker>
              </gmap-map>
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
          <h1 class="heading">Features and amenities</h1>
        </div>
        <div v-else-if="current === 3">
          <h1 class="heading">Timings and pricing</h1>
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
        <button class="button" v-if="current < steps.length - 1" type="primary" @click="next">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const ListingRepository = RepositoryFactory.get("listings");
export default {
  data() {
    return {
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
      typeOptions: ["Wedding", "Party", "Corporate", "Sports", "Production"],
      listing: {
        title: "",
        type: null
      },
      permalink: null,
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  watch: {
    $route(to) {
      this.permalink = to.params.permalink;
    }
  },
  methods: {
    startListing() {
      let permalink = this.listing.title.split(" ").join("-");
      this.$router.push("/listing/" + permalink);
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    setPlace(place) {
      this.currentPlace = place;
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
