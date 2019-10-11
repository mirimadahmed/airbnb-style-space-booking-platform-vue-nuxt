<template>
  <div class="p-4">
    <div class="row m-0 p-0" v-if="isLoading">
      <div class="col-md-12 my-4">
        <CompanyLoader class="col-md-3 m-auto" />
      </div>
      <div class="col-md-3" v-for="i in [0,1,2,3]" :key="i">
        <CompanyLoader />
      </div>
    </div>
    <div v-else>
      <div class="row m-0 p-0">
        <div class="col-md-12">
          <a-avatar :size="150" :src="company.logo_image" />
        </div>
        <div class="col-md-12 mt-2">
          <h1 class="heading">{{ company.name }}</h1>
        </div>
        <div class="col-md-12">
          <p class="address">
            <i class="fa fa-map-marker" />
            {{ company.address }}
          </p>
        </div>
      </div>
      <div class="row m-0 p-0" v-if="listings.length > 0">
        <div class="col-md-12">
          <p class="sub-heading text-left">Spaces offered by {{company.name}}</p>
        </div>
      </div>
      <div class="row m-0 p-0" v-if="listings.length > 0">
        <div v-for="listing in listings" :key="listing.bpl_id" class="col-md-3">
          <CompanyBlock :company="listing.Entity" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CompanyBlock from "@/components/CompanyBlock.vue";
import CompanyLoader from "@/components/CompanyLoader.vue";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const UserRepository = RepositoryFactory.get("user");
const ListingRepository = RepositoryFactory.get("listings");

export default {
  components: {
    CompanyBlock,
    CompanyLoader
  },
  data() {
    return {
      isLoading: false,
      company: {},
      listings: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      const { data } = await UserRepository.getCompanyProfile(
        this.$route.params.permalink
      );
      this.company = data;
      this.getListings();
    },
    async getListings() {
      const { data } = await ListingRepository.getAll(this.company.bpl_id);
      this.listings = data.filter(
        listing => listing.Entity.status === "approved"
      );
      this.isLoading = false;
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

