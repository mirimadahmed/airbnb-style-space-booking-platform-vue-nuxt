<template>
  <div>
    <SearchBar :search="query" @map-changed="updateMap" />
    <!-- <Filters @map-changed="updateMap" /> -->
    <vue-content-loading v-if="isLoading" :width="300" :height="120">
      <rect x="10" y="10" rx="4" ry="4" width="85" height="100" />
      <rect x="105" y="10" rx="4" ry="4" width="85" height="100" />
      <rect x="195" y="10" rx="4" ry="4" width="85" height="100" />
    </vue-content-loading>
    <div
      id="main-wrapper"
      class="row m-0"
      v-else
      :style="{
            'height': `calc(100vh - ${filterSectionHeight}px)`
     }"
    >
      <div class="col-md-12 mt-5" v-if="companies.length === 0">
        <h4>No spaces found with this search criteria.</h4>
      </div>
      <div v-else class="h-100">
        <div class="row px-0 h-100 mx-0">
          <div :class="outerClass" class="h-100">
            <div class="row">
              <div class="col-md-12 text-left">
                <p>showing {{ currentTotal }} of total {{ total }} spaces</p>
              </div>
            </div>
            <div :class="itemsClass" v-for="company in companies" :key="company.bpl_id">
              <CompanyBlock :company="company" />
            </div>
            <div class="col-md-12 loading-more text-center" v-if="isLoadingMore">Loading More</div>
          </div>
          <div v-if="mapOn" class="col-md-5 h-100 p-0">
            <GmapMap
              :center="{lat:33.684422, lng:73.047882}"
              :zoom="17"
              map-type-id="terrain"
              class="col-md-12 h-100 p-0"
            ></GmapMap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueContentLoading from "vue-content-loading";
import SearchBar from "@/components/SearchBar.vue";
import Filters from "@/components/Filters.vue";
import CompanyBlock from "@/components/CompanyBlock.vue";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const SearchRepository = RepositoryFactory.get("search");

export default {
  components: {
    SearchBar,
    Filters,
    CompanyBlock,
    VueContentLoading
  },
  data() {
    return {
      isLoading: false,
      isLoadingMore: false,
      companies: [],
      nextLink: "",
      mapOn: true,
      query: null,
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
      const filterSectionDOM2 = document.getElementById("search-bar");
      const height1 = filterSectionDOM ? filterSectionDOM.clientHeight : 0;
      const height2 = filterSectionDOM2 ? filterSectionDOM2.clientHeight : 0;
      return height1 + height2;
    },
    itemsClass() {
      return this.mapOn ? "col-md-6" : "col-md-4";
    },
    outerClass() {
      return this.mapOn ? "col-md-7" : "col-md-12";
    },
    currentTotal() {
      return this.companies.length;
    }
  },
  created() {
    this.query = this.$route.query;
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
      this.query = to.params.query;
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

