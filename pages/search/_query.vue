<template>
  <div>
    <!-- <Filters @map-changed="updateMap" /> -->
    <div class="row m-0 p-4" v-if="isLoading">
      <div class="col-md-4">
        <a-skeleton active :title="false" :paragraph="{rows: 10}" />
      </div>
      <div class="col-md-4">
        <a-skeleton active :title="false" :paragraph="{rows: 10}" />
      </div>
      <div class="col-md-4">
        <a-skeleton active :title="false" :paragraph="{rows: 10}" />
      </div>
    </div>
    <div
      id="main-wrapper"
      class="row m-0"
      v-else
      :style="{
            'height': `calc(100vh - ${filterSectionHeight}px)`
     }"
    >
      <div class="w-100 h-100">
        <div class="row px-0 h-100 mx-0">
          <div :class="outerClass" class="h-100 overflow-auto">
            <SearchBar @map-changed="updateMap" />
            <div class="col-md-12 mt-5 pt-4" v-if="companies.length === 0">
              <h4>No spaces found with this search criteria.</h4>
            </div>
            <div v-else class="row">
              <div class="col-md-12 text-left pt-3 font-weight-bold">
                <p>showing {{ currentTotal }} of total {{ total }} spaces</p>
              </div>
            </div>
            <div class="row" v-if="companies.length > 0">
              <div v-for="company in companies" :key="company.bpl_id" :class="itemsClass">
                <CompanyBlock :company="company" />
              </div>
            </div>
            <div class="col-md-12 loading-more text-center" v-if="isLoadingMore">Loading More</div>
          </div>
          <div v-if="mapOn && companies.length > 0" class="col-md-5 h-100 p-0 d-none d-md-block">
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
              :center="{lat: companies[0].latitude, lng: companies[0].longitude}"
              :zoom="13"
              map-type-id="roadmap"
              class="col-md-12 h-100 p-0"
              ref="mapRef"
            >
              <GmapMarker
                :key="index"
                v-for="(m, index) in companies"
                :position="{lat: m.latitude, lng: m.longitude}"
              />
            </GmapMap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBar from "@/components/Search/SearchBar.vue";
import Filters from "@/components/Search/Filters.vue";
import CompanyBlock from "@/components/CompanyBlock.vue";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const SearchRepository = RepositoryFactory.get("search");

export default {
  components: {
    SearchBar,
    Filters,
    CompanyBlock
  },
  data() {
    return {
      isLoading: false,
      isLoadingMore: false,
      companies: [],
      nextLink: "",
      mapOn: true,
      query: {},
      total: 0,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    filterSectionHeight() {
      const filterSectionDOM = document.getElementById("top-menu");
      // const filterSectionDOM2 = document.getElementById("search-bar");
      const height1 = filterSectionDOM ? filterSectionDOM.clientHeight : 0;
      // const height2 = filterSectionDOM2 ? filterSectionDOM2.clientHeight : 0;
      // return height1 + height2;
      return height1;
    },
    itemsClass() {
      return this.mapOn ? "col-md-6" : "col-md-3";
    },
    outerClass() {
      return this.mapOn ? "col-md-7" : "col-md-12";
    },
    currentTotal() {
      return this.companies.length;
    }
  },
  created() {
    let queryString = this.$route.params.query.split("&");
    queryString.forEach(str => {
      let keyVal = str.split("=");
      this.query[keyVal[0]] = keyVal[1];
    });
    this.fetch();
    this.scroll();
  },
  methods: {
    scroll() {
      if (process.client) {
        window.onscroll = async () => {
          let bottomOfWindow =
            document.documentElement.scrollTop + window.innerHeight ===
            document.documentElement.offsetHeight;
          if (bottomOfWindow && !this.isLoadingMore && this.nextLink) {
            this.isLoadingMore = true;
            const { data } = await SearchRepository.get(
              this.nextLink.split("?")[1]
            );
            this.isLoadingMore = false;
            this.nextLink = data.links.next;
            this.total = data.count;
            data.results.forEach(result => this.companies.push(result));
          }
        };
      }
    },
    async fetch() {
      this.isLoading = true;
      const queryStr = Object.keys(this.query)
        .map(key => key + "=" + this.query[key])
        .join("&");
      const { data } = await SearchRepository.get(queryStr);
      this.isLoading = false;
      this.companies = data.results;
      this.nextLink = data.links.next;
      this.total = data.count;
    },
    updateMap(mapOn) {
      this.mapOn = mapOn;
    }
  },
  watch: {
    $route(to) {
      let queryString = this.$route.params.query.split("&");
      queryString.forEach(str => {
        let keyVal = str.split("=");
        this.query[keyVal[0]] = keyVal[1];
      });
      this.fetch();
    }
  }
};
</script>

<style scoped>
.loading-more {
  font-weight: 600;
  font-size: 16px;
  color: rgb(151, 78, 65);
}
</style>

