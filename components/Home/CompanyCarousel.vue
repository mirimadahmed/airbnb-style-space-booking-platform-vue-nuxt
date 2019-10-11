<template>
  <carousel
    :per-page="4"
    :mouse-drag="false"
    :autoplay="true"
    :loop="true"
    :navigationEnabled="true"
  >
    <slide v-for="(company, i) in listings" :key="i" style="margin-left:27px;">
      <CompanyBlock :company="company.Entity" />
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { CarouselCard, CarouselCardItem } from "vue-carousel-card";
import "vue-carousel-card/styles/index.css";
import CompanyBlock from "@/components/CompanyBlock.vue";
export default {
  components: {
    CompanyBlock,
    CarouselCard,
    CarouselCardItem,
    Carousel,
    Slide
  },
  props: {
    listings: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
