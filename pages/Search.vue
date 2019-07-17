<template>
  <div>
    <SearchBar :search="query" />
    <Filters @map-changed="updateMap" />
    <vue-content-loading v-if="isLoading" :width="300" :height="120">
      <rect x="10" y="10" rx="4" ry="4" width="85" height="100" />
      <rect x="105" y="10" rx="4" ry="4" width="85" height="100" />
      <rect x="195" y="10" rx="4" ry="4" width="85" height="100" />
    </vue-content-loading>
    <div class="row mx-5" v-else>
      <div class="col-md-12 mt-5" v-if="companies.length === 0">
        <h4>No such listings found.</h4>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-md-12 text-left">
            <p>showing {{ currentTotal }} of total {{ total }} spaces</p>
          </div>
        </div>
        <div class="main-outer row px-0" :class="outerClass">
          <div class="mb-4" :class="itemsClass" v-for="company in companies" :key="company.bpl_id">
            <CompanyBlock :company="company" />
          </div>
        </div>
        <div class="col-md-12 loading-more text-center" v-if="isLoadingMore">Loading More</div>
        <div v-if="mapOn" class="col-md-4">Map Here</div>
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
  auth: false,
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
      mapOn: false,
      query: null,
      total: 0
    };
  },
  computed: {
    itemsClass() {
      return this.mapOn ? "col-md-6" : "col-md-4";
    },
    outerClass() {
      return this.mapOn ? "col-md-8" : "col-md-12";
    },
    currentTotal() {
      return this.companies.length;
    }
  },
  created() {
    this.query = this.$route.params.query;
    this.fetch();
    this.scroll();
  },
  methods: {
    search(updatedQuery) {
      this.query = updatedQuery;
      this.fetch();
    },
    scroll() {
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
    },
    async fetch() {
      this.isLoading = true;
      const { data } = await SearchRepository.get(this.query);
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
.main-outer {
}
</style>

