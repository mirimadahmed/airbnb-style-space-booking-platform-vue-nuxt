<template>
  <div class="m-5 p-4">
    <h1 v-if="wedding_listings.length>0" class="heading">Top Wedding Venues</h1>
    <carousel :per-page="3" :mouse-drag="false" :autoplay="true" :loop="true" :navigationEnabled="true">
    <slide v-for="(company,i) in wedding_listings" :key="i" style="margin-left:27px;" >
        <CompanyBlock :company="company" />
    </slide>
  </carousel>
    <!-- <div class="row offset-md-2">
      <div class="col-md-4">
        <CarouselCard  :interval="7000" height="300px" style="width:815px;" type="card" arrow="always">
          <CarouselCardItem class="shadow"  style="width:400px;border-width:2px;border-color:blue;" v-for="(company,i) in listings" :key="i"  >
            <CompanyBlockMain :company="company" style="  background: linear-gradient(90deg, rgb(246, 247, 248), rgb(246, 246, 250))"/>
          </CarouselCardItem>
        </CarouselCard>
      </div>
    </div> -->
    <h1 v-if="party_listings.length>0" class="heading">Top Party Venues</h1>
    <carousel :per-page="3"  :mouse-drag="false" :autoplay="true" :loop="true" :navigationEnabled="true">
    <slide v-for="(company,i) in party_listings" :key="i" style="margin-left:27px;" >
        <CompanyBlock :company="company" />
      </slide>
    </carousel>
  
      <h1 v-if="corporate_listings.length>0" class="heading">Top Corporate Venues</h1>
      <carousel :per-page="3"  :mouse-drag="false" :autoplay="true" :loop="true" :navigationEnabled="true">
      <slide v-for="(company,i) in corporate_listings" :key="i" style="margin-left:27px;" >
          <CompanyBlock :company="company" />
      </slide>
      </carousel>

    <h1 v-if="sports_listings.length>0" class="heading">Top Sports Venues</h1>
    <carousel :per-page="3"  :mouse-drag="false" :autoplay="true" :loop="true" :navigationEnabled="true">
    <slide v-for="(company,i) in sports_listings" :key="i" style="margin-left:27px;" >
        <CompanyBlock :company="company" />
    </slide>
    </carousel>

    <h1 v-if="production_listings.length>0" class="heading">Top Production Venues</h1>
    <carousel :per-page="3"  :mouse-drag="false" :autoplay="true" :loop="true" :navigationEnabled="true">
    <slide v-for="(company,i) in production_listings" :key="i" style="margin-left:27px;" >
        <CompanyBlock :company="company" />
    </slide>
    </carousel>
  </div>
  
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

import { CarouselCard, CarouselCardItem } from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css'
import CompanyBlockMain from "@/components/CompanyBlockMain.vue";
import CompanyBlock from "@/components/CompanyBlock.vue";

import { RepositoryFactory } from "@/repository/RepositoryFactory";
const ListingRepository = RepositoryFactory.get("listings");
export default {
  components: { CarouselCard, CarouselCardItem ,CompanyBlockMain,Carousel,Slide,CompanyBlock},
  created(){
    this.getVenues()
  },
  methods:{
    async getVenues(){
      const wedding_response = await ListingRepository.getTopVenues(1);
      this.wedding_listings=wedding_response.data
      const party_response = await ListingRepository.getTopVenues(2);
      this.party_listings=party_response.data
      const corporate_response = await ListingRepository.getTopVenues(3);
      this.corporate_listings=corporate_response.data
      const sports_response = await ListingRepository.getTopVenues(4);
      this.sports_listings=sports_response.data
      const production_response = await ListingRepository.getTopVenues(5);
      this.production_listings=production_response.data
    }

  },
  data() {
    return {
      wedding_listings:[],
      party_listings:[],
      corporate_listings:[],
      sports_listings:[],
      production_listings:[]
    };
  }
};
</script>

<style scoped>
.heading {
  font-weight: 600;
  padding: 50px 0px;
}

/* h1{
    height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  background: linear-gradient(90deg, rgba(88,140,236,1), rgba(106,106,207,1))
} */
</style>
