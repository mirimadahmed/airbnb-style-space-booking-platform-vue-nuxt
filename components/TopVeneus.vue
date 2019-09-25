<template>
  <div class="m-5 p-4">
    <h1 class="heading">Top Wedding Venues</h1>
    <carousel :per-page="3"  :mouse-drag="false" :autoplay="true" :loop="true" :navigationEnabled="true">
    <slide v-for="(company,i) in listings" :key="i" style="padding-left:10px;" >
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
      const {data} = await ListingRepository.getTopVenues(1);
      this.listings=data
      console.log(data)
    }

  },
  data() {
    return {
      listings:[
        // {
        //   address:"Islamabad Road",
        //   featured_image:"https://spacesly.s3.amazonaws.com/media/Adams-Lodge.jpg",
        //   name:"Phantom Hawk Marquee",

        // },
        // {
        //   address:"Islamabad Club Road",
        //   featured_image:"https://spacesly.s3.amazonaws.com/media/crop-cops-crop-cops-crop-cops_wwFStXJ.jpg",
        //   name:"Dream Land Hotel Dream Land Hotel ",

        // },
        //  {
        //   address:"Islamabad Club Road",
        //   featured_image:"https://spacesly.s3.amazonaws.com/media/crop-cops-crop-cops-crop-cops_wwFStXJ.jpg",
        //   name:"Hello world ",

        // },
        // {
        //   address:"Islamabad Club Road",
        //   featured_image:"https://spacesly.s3.amazonaws.com/media/demo-dorks-drops-_bGjVW1j.jpg",
        //   name:"Auxilliary Guards Hotel",
          
        // }
          
      ]
    };
  }
};
</script>

<style scoped>
/* .abc{
  text-align:center
} */
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
