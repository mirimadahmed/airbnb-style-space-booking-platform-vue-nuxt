<template>
  <div>
    <div class="m-5 p-2" v-if="wedding_listings.length>0">
      <h1 class="heading">Top Wedding Venues</h1>
      <CompanyCarousel :listings="wedding_listings" />
    </div>
    <div class="m-5 p-2" v-if="party_listings.length>0">
      <h1 class="heading">Top Party Venues</h1>
      <CompanyCarousel :listings="party_listings" />
    </div>
    <div class="m-5 p-2" v-if="corporate_listings.length>0">
      <h1 class="heading">Top Corporate Venues</h1>
      <CompanyCarousel :listings="corporate_listings" />
    </div>
    <div class="m-5 p-2" v-if="sports_listings.length>0">
      <h1 class="heading">Top Sports Venues</h1>
      <CompanyCarousel :listings="sports_listings" />
    </div>
    <div class="m-5 p-2" v-if="production_listings.length>0">
      <h1 class="heading">Top Production Venues</h1>
      <CompanyCarousel :listings="production_listings" />
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const ListingRepository = RepositoryFactory.get("listings");

import CompanyCarousel from "./CompanyCarousel";

export default {
  components: {
    CompanyCarousel
  },
  created() {
    this.getVenues();
  },
  methods: {
    async getVenues() {
      const wedding_response = await ListingRepository.getTopVenues(1);
      this.wedding_listings = wedding_response.data;
      const party_response = await ListingRepository.getTopVenues(2);
      this.party_listings = party_response.data;
      const corporate_response = await ListingRepository.getTopVenues(3);
      this.corporate_listings = corporate_response.data;
      const sports_response = await ListingRepository.getTopVenues(4);
      this.sports_listings = sports_response.data;
      const production_response = await ListingRepository.getTopVenues(5);
      this.production_listings = production_response.data;
    }
  },
  data() {
    return {
      wedding_listings: [],
      party_listings: [],
      corporate_listings: [],
      sports_listings: [],
      production_listings: []
    };
  }
};
</script>

<style scoped>
.heading {
  font-weight: 600;
  padding: 0px 0px 20px 0px;
}
</style>
