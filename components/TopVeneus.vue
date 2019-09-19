<template>
  <div class="m-5 p-4">
    <h1 class="heading">Top Wedding Venues</h1>
      <CarouselCard  :interval="7000" height="300px" type="card" arrow="always">
        <CarouselCardItem v-for="(company,i) in listings" :key="i" class="shadow" >
          <CompanyBlockMain :company="company" style="  background: linear-gradient(90deg, rgb(246, 247, 248), rgb(246, 246, 250))"/>
        </CarouselCardItem>
        </CarouselCard>
  </div>
</template>

<script>
import { CarouselCard, CarouselCardItem } from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css'
import CompanyBlockMain from "@/components/CompanyBlockMain.vue";

export default {
  components: { CarouselCard, CarouselCardItem ,CompanyBlockMain},
  data() {
    return {
      listings:[
        {
          address:"Islamabad Club Road",
          featured_image:"https://spacesly.s3.amazonaws.com/media/Adams-Lodge.jpg",
          name:"Dream Land Hotel Dream Land Hotel ",

        },
        {
          address:"Islamabad Club Road",
          featured_image:"https://spacesly.s3.amazonaws.com/media/Adams-Lodge.jpg",
          name:"Dream Land Hotel Dream Land Hotel ",
          
        },
        {
          address:"Islamabad Club Road",
          featured_image:"https://spacesly.s3.amazonaws.com/media/Adams-Lodge.jpg",
          name:"Dream Land Hotel Dream Land Hotel ",
        }
          
      ]
    };
  }
};
</script>

<style scoped>
.heading {
  font-weight: 600;
  padding: 50px 0px;
}
</style>
