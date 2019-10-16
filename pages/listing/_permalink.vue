<template>
  <div>
    <div v-if="isLoading">
      <div class="row p-4 m-0">
        <div class="col-md-8">
          <a-skeleton active :title="false" :paragraph="{rows: 10}" />
        </div>
        <div class="col-md-4">
          <a-skeleton active :title="false" :paragraph="{rows: 4}" />
        </div>
      </div>
    </div>
    <div v-else-if="entity">
      <div class="row p-2 m-0 main-wrapper">
        <div class="col-md-8 p-2">
          <div class="row m-0 fields">
            <div class="col-md-12 mb-4 text-center">
              <div class="row m-0 w-100 text-center">
                <no-ssr>
                  <lingallery class="w-100 text-center" :items="slides" />
                </no-ssr>
              </div>
            </div>
            <div class="col-md-12 mb-2 text-left">
              <div class="col-md-6 p-0">
                <h1 class="heading">{{ entity.Entity.name }}</h1>
                <p class="address">
                  <i class="fa fa-map-marker" />
                  {{ entity.Entity.address }}
                </p>
              </div>
              <div class="col-md-6 p-0 text-right" v-if="!isLoadingCompany">
                <div class="row m-0 p-0">
                  <div class="col-md-12">
                    <a-avatar :size="150" :src="company.logo_image" />
                  </div>
                  <div class="col-md-12 mt-2">
                    <h1 class="heading">{{ company.name }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 p-4 text-left">
              <h2 class="sub-heading">About space</h2>
              <p class="description">{{ entity.Entity.description }}</p>
            </div>
            <div class="col-md-12">
              <div class="col-md-10 m-auto">
                <a-divider />
              </div>
            </div>
            <div class="col-md-12" v-if="entity.CustomFields.Capacity">
              <div class="row m-0 text-left">
                <h2 class="col-md-12 sub-heading">Capacity</h2>
                <p
                  class="col-md-4 mb-0 py-2 feature"
                  v-for="capacity in entity.CustomFields.Capacity"
                  :class="capacity.value > 0 ? 'active-feature' : 'inactive-feature'"
                  :key="capacity.cfd_id"
                >{{ capacity.name + ' ' + capacity.value }}</p>
              </div>
            </div>
            <div class="col-md-12" v-if="entity.CustomFields.Capacity">
              <div class="col-md-10 m-auto">
                <a-divider />
              </div>
            </div>
            <div class="col-md-12" v-if="entity.CustomFields.Amenities">
              <div class="row m-0 text-left">
                <h2 class="col-md-12 sub-heading">Amenities offered</h2>
                <p
                  class="col-md-4 mb-0 py-2 feature"
                  v-for="amenity in entity.CustomFields.Amenities"
                  :class="amenity.value === 'True' ? 'active-feature' : 'inactive-feature'"
                  :key="amenity.cfd_id"
                >{{ amenity.name }}</p>
              </div>
            </div>
            <div class="col-md-12" v-if="entity.CustomFields.Amenities">
              <div class="col-md-10 m-auto">
                <a-divider />
              </div>
            </div>
            <div class="col-md-12 mb-4" v-if="entity.CustomFields.Activities">
              <div class="row m-0 text-left">
                <h2 class="col-md-12 sub-heading">Activities allowed</h2>
                <p
                  class="col-md-4 mb-0 py-2 feature"
                  v-for="feature in entity.CustomFields.Activities"
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
            <div class="col-md-12" v-if="entity.CustomFields.Activities">
              <div class="col-md-10 m-auto">
                <a-divider />
              </div>
            </div>

            <div class="col-md-12 mb-4 text-left" v-if="addOns.length > 0">
              <h3 class="sub-heading">Offerings by space</h3>
              <div class="row m-0 p-0">
                <div v-for="(addOn, i) in addOns" :key="i" class="col-md-4 pl-0 pr-2 pt-2 pb-2">
                  <AddOn :addOn="addOn" />
                </div>
              </div>
            </div>
            <div class="col-md-12 mb-4 text-left" v-if="menus.length > 0">
              <h3 class="sub-heading">Food Menus</h3>
              <div class="row m-0 p-0">
                <div v-for="(menu, i) in menus" :key="i" class="col-md-4 pl-0 pr-2 pt-2 pb-2">
                  <Menu :menu="menu" />
                </div>
              </div>
            </div>
            <div class="col-md-12 p-0 map-field" v-if="entity.Entity.latitude">
              <GmapMap
                :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false
              }"
                :center="{lat:entity.Entity.latitude, lng:entity.Entity.longitude}"
                :zoom="17"
                map-type-id="terrain"
                class="col-md-12 h-100"
              >
                <GmapMarker :position="{lat:entity.Entity.latitude, lng:entity.Entity.longitude}" />
              </GmapMap>
            </div>
            <div class="col-md-12" v-if="otherSpaces.length > 0">
              <div class="col-md-10 m-auto">
                <a-divider />
              </div>
            </div>
            <div class="col-md-12 my-4" v-if="otherSpaces.length > 0">
              <p class="sub-heading text-left">Other spaces from this host</p>
              <CompanyCarousel :listings="otherSpaces" />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="sidebar-item">
            <div class="make-me-sticky text-left">
              <div class="row m-0 border">
                <div class="col-md-12 pt-4 text-center">
                  <p class="price" v-if="basePrice !== null">
                    Starting from Rs. {{ basePrice }}
                    <span class="per-hour">/hr</span>
                  </p>
                </div>
                <div class="col-md-12 py-2 text-center">
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
                <div class="col-md-12 py-2">
                  <b-form-input
                    class="border form-element"
                    placeholder="Event Type"
                    v-model="request.activity"
                    :disabled="isRequestLoading"
                  ></b-form-input>
                </div>
                <div class="col-md-12 py-2">
                  <b-form-input
                    class="border form-element"
                    placeholder="Contact Name"
                    v-model="request.name"
                    :disabled="isRequestLoading"
                  ></b-form-input>
                </div>
                <div class="col-md-12 py-2">
                  <b-form-input
                    class="border form-element"
                    placeholder="Email Address"
                    v-model="request.email"
                    :disabled="isRequestLoading"
                  ></b-form-input>
                </div>
                <div class="col-md-12 py-2">
                  <b-form-input
                    class="border form-element"
                    placeholder="Phone Number"
                    v-model="request.phone"
                    :disabled="isRequestLoading"
                  ></b-form-input>
                </div>
                <div class="col-md-12 text-center p-4">
                  <button class="request-booking" @click="send">Send Inquiry</button>
                </div>
                <div class="col-md-12 text-center pb-2">Typically response with-in 6 hours</div>
              </div>
              <div class="row text-center border py-3 mx-0 mt-3">
                <social-sharing
                  :url="url"
                  :title="entity.Entity.name"
                  :description="entity.Entity.description"
                  :quote="entity.Entity.description"
                  hashtags="spacesly, space booking"
                  twitter-user="spacesly"
                  inline-template
                >
                  <div class="row col-md-12 m-0 text-left p-0">
                    <div class="col-md-6 sub-heading">Share on</div>
                    <div class="col-md-6">
                      <network network="facebook" class="px-2 py-1 m-auto border rounded-circle">
                        <i class="fa fa-facebook"></i>
                      </network>
                      <network network="twitter" class="px-2 py-1 m-auto border rounded-circle">
                        <i class="fa fa-twitter"></i>
                      </network>
                      <network network="whatsapp" class="px-2 py-1 m-auto border rounded-circle">
                        <i class="fa fa-whatsapp"></i>
                      </network>
                    </div>
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
import AddOn from "@/components/Listing/AddOn";
import Menu from "@/components/Listing/Menu";
import CompanyCarousel from "@/components/Home/CompanyCarousel";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
import SocialSharing from "vue-social-sharing";
const ListingRepository = RepositoryFactory.get("listings");
const RequestRepository = RepositoryFactory.get("request");
const UserRepository = RepositoryFactory.get("user");

export default {
  components: {
    AddOn,
    Menu,
    SocialSharing,
    CompanyCarousel
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
      entity: null,
      slides: [],
      url: "",
      products: [],
      productsLoading: false,
      isLoadingCompany: false,
      company: {},
      otherSpaces: []
    };
  },
  computed: {
    addOns() {
      return this.products.filter(item => item.product_type === "addons");
    },
    basePrice() {
      let arr = this.products.filter(item => item.product_type === "baseprice");
      if (arr.length > 0) {
        return arr[0].Pricing[0].rate;
      }
      return null;
    },
    menus() {
      return this.products.filter(item => item.product_type === "menu");
    }
  },
  created() {
    this.url = window.location.href;
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
      this.slides = this.entity.Entity.images.map((img, index) => {
        return { id: index, src: img, thumbnail: img };
      });
      this.getProducts();
      this.getCompanyProfile();
      this.getOtherSpaces();
    },
    async getProducts() {
      this.productsLoading = true;
      this.request.entity_id = this.entity.Entity.entity_id;
      const { data } = await ListingRepository.getProducts(
        this.request.entity_id
      );
      this.productsLoading = false;
      this.products = data;
    },
    async getOtherSpaces() {
      const { data } = await ListingRepository.getAll(
        this.entity.Entity.company_id
      );
      this.otherSpaces = data.filter(
        item =>
          item.Entity.status === "approved" &&
          item.Entity.entity_id !== this.entity.Entity.entity_id
      );
    },
    async getCompanyProfile() {
      this.isLoadingCompany = true;
      const { data } = await UserRepository.getCompanyProfile(
        this.entity.Entity.company_id
      );
      this.company = data;
      this.isLoadingCompany = false;
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

.active-feature {
  color: black;
}
.inactive-feature {
  color: lightgray;
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
  height: 35px;
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
  padding: 0 50px;
}

.request-booking {
  background: linear-gradient(#ff4d78, #fa7649);
  font-weight: 600;
  border: none;
  padding: 10px 50px;
  font-size: 16px;
  color: white;
}

.carousel-inner > .item > img {
  width: 100%;
  height: 208px;
}
.form-element {
  font-weight: 400;
  font-size: 14px;
}

.price {
  font-weight: 600;
  font-size: 22px;
  color: #fa7649;
}

.per-hour {
  font-size: 14px;
  font-weight: 300;
  color: black;
}
</style>
