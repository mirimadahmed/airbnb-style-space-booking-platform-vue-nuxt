<template>
  <div>
    <vue-content-loading v-if="isLoading" :width="300" :height="120">
      <rect x="0" y="10" rx="4" ry="4" width="200" height="100" />
      <rect x="220" y="10" rx="4" ry="4" width="70" height="100" />
    </vue-content-loading>
    <div v-else-if="entity">
      <div class="row">
        <div class="col-md-12"></div>
      </div>

      <div class="row p-5 mr-0 main-wrapper">
        <div class="col-md-8">
          <!-- <div class="row nav">
            <div class="col-md-2">Photos</div>
            <div class="col-md-2">Overview</div>
            <div class="col-md-2">Amneties</div>
            <div class="col-md-2">Features</div>
            <div class="col-md-2" v-if="entity.Entity.latitude">Map</div>
          </div>-->
          <div class="row fields px-4">
            <div class="col-md-12 shadow-sm mb-4">
              <div class="row">
                <b-carousel
                  id="carousel-1"
                  :interval="4000"
                  controls
                  indicators
                  background="#ababab"
                  img-width="1024"
                  img-height="480"
                  style="text-shadow: 1px 1px 2px #333;"
                >
                  <!-- Text slides with image -->
                  <b-carousel-slide v-for="(image, i) in entity.Entity.images" :key="i">
                    <template v-slot:img>
                      <img
                        class="d-block img-fluid w-100"
                        width="1024"
                        height="480"
                        :src="image"
                        alt="image slot"
                      />
                    </template>
                  </b-carousel-slide>
                </b-carousel>
              </div>
            </div>
            <div class="col-md-12 shadow-sm mb-4 p-4 text-left">
              <h1 class="heading">{{ entity.Entity.name }}</h1>
              <p class="address">{{ entity.Entity.address }}</p>
              <p class="description">{{ entity.Entity.description }}</p>
            </div>
            <div class="col-md-12 shadow-sm mb-4">
              <div class="row mb-0">
                <p
                  class="col-md-3 mb-0 py-4 feature"
                  v-for="amenity in entity.CustomFields.Amenities"
                  :class="amenity.value === 'True' ? 'active-feature' : 'inactive-feature'"
                  :key="amenity.cfd_id"
                >{{ amenity.name }}</p>
              </div>
            </div>
            <div class="col-md-12 shadow-sm mb-4">
              <div class="row mb-0">
                <p
                  class="col-md-3 mb-0 py-4 feature"
                  v-for="feature in entity.CustomFields.Features"
                  :key="feature.cfd_id"
                  :class="feature.field_type === 'boolean' && feature.value === 'False' ? 'inactive-feature' : 'active-feature'"
                >
                  {{ feature.name}}
                  <span
                    v-if="feature.field_type !== 'boolean'"
                  >{{ ' ' + feature.value }}</span>
                </p>
              </div>
            </div>

            <div class="col-md-12 shadow-sm p-0 map-field" v-if="entity.Entity.latitude">
              <GmapMap
                :center="{lat:entity.Entity.latitude, lng:entity.Entity.longitude}"
                :zoom="17"
                map-type-id="terrain"
                class="col-md-12 h-100"
              >
                <GmapMarker :position="{lat:entity.Entity.latitude, lng:entity.Entity.longitude}" />
              </GmapMap>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="sidebar-item">
            <div class="make-me-sticky text-left">
              <div class="row shadow-sm">
                <div class="col-md-12 p-4">
                  <h1 class="heading">{{ msg }}</h1>
                </div>
                <div class="col-md-12 px-0">
                  <!-- <Datepicker
                    placeholder="When?"
                    :disabled-dates="disabledDates"
                    :bootstrap-styling="true"
                    v-model="request.when"
                    :disabled="isRequestLoading"
                  />-->
                </div>
                <div class="col-md-12 px-0">
                  <b-form-input
                    placeholder="Event Type"
                    v-model="request.activity"
                    :disabled="isRequestLoading"
                  ></b-form-input>
                </div>
                <div class="col-md-12 shadow-sm px-0">
                  <b-form-input
                    placeholder="Contact Name"
                    v-model="request.name"
                    :disabled="isRequestLoading"
                  ></b-form-input>
                </div>
                <div class="col-md-12 px-0">
                  <b-form-input
                    placeholder="Email Address"
                    v-model="request.email"
                    :disabled="isRequestLoading"
                  ></b-form-input>
                </div>
                <div class="col-md-12 px-0">
                  <b-form-input
                    class
                    placeholder="Phone Number"
                    v-model="request.phone"
                    :disabled="isRequestLoading"
                  ></b-form-input>
                </div>
                <div class="col-md-12 text-center p-4">
                  <p>Starting from 2000 per head</p>
                  <button class="request-booking" @click="send">SEND</button>
                </div>
              </div>
              <div class="row shadow-sm text-center py-3 mt-3 px-4">
                <social-sharing
                  url="https://vuejs.org/"
                  title="The Progressive JavaScript Framework"
                  description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                  quote="Vue is a progressive framework for building user interfaces."
                  hashtags="vuejs,javascript,framework"
                  twitter-user="vuejs"
                  inline-template
                >
                  <div class="row">
                    <div class="col-md-12 py-2 mb-2 font-weight-bold share-msg">Share on</div>
                    <network network="facebook" class="col-md-4">
                      <i class="fa fa-facebook"></i> Facebook
                    </network>
                    <network network="twitter" class="col-md-4">
                      <i class="fa fa-twitter"></i> Twitter
                    </network>
                    <network network="whatsapp" class="col-md-4">
                      <i class="fa fa-whatsapp"></i> Whatsapp
                    </network>
                  </div>
                </social-sharing>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import VueContentLoading from "vue-content-loading";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
import SocialSharing from "vue-social-sharing";
const ListingRepository = RepositoryFactory.get("listings");
const RequestRepository = RepositoryFactory.get("request");

export default {
  components: {
    VueContentLoading,
    SocialSharing
  },
  data() {
    return {
      isLoading: false,
      disabledDates: {
        to: new Date()
      },
      isRequestLoading: false,
      msg: "Request to book",
      request: {
        entity_id: 2,
        activity: null,
        when: null,
        name: null,
        phone: null,
        email: null,
        status: "s"
      },
      entity: null
    };
  },
  created() {
    console.log(this.$route);
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      const { data } = await ListingRepository.get(
        this.$route.params.permalink
      );
      this.isLoading = false;
      this.entity = data;
      this.request.entity_id = data.Entity.entity_id;
    },
    async send() {
      this.isRequestLoading = true;
      const { data } = await RequestRepository.post(this.request);
      this.isRequestLoading = false;
      this.msg = "Request sent! we will be in contact shortly.";
      this.request.activity = null;
      this.request.when = null;
      this.request.name = null;
      this.request.phone = null;
      this.request.email = null;
    }
  }
};
</script>

<style scoped>
@media (max-width: 425px) {
  .main-wrapper {
    padding: 1rem !important;
  }
  .sidebar-item {
    position: unset !important;
  }

  .make-me-sticky {
    position: unset !important;
    min-height: 400px;
    margin-top: 20px;
    padding: 0 25px !important;
  }
}
.share-msg {
  font-size: 16px;
}
.feature {
  font-weight: bold;
}
.active-feature {
  color: black;
}
.inactive-feature {
  color: lightgray;
}
.heading {
  font-weight: 600;
  font-size: 22px;
}
.nav div {
  font-weight: 600;
}
.map-field {
  min-height: 300px;
}

.form-control {
  border: none;
  border-radius: 0px;
  font-weight: 500;
  height: 50px;
}
.sidebar-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.make-me-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  min-height: 400px;
  padding: 0 15px;
}

.address {
  font-weight: 400;
  font-size: 12px;
}
.description {
  font-weight: 500;
  font-size: 14px;
}
.request-booking {
  background: linear-gradient(#ff4d78, #fa7649);
  font-weight: 600;
  border: none;
  padding: 10px 50px;
  font-size: 16px;
  color: white;
}
</style>
