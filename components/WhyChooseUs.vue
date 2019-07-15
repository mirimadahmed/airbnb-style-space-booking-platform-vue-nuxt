<template>
  <div class="m-5 p-4">
    <h1 class="heading">Why Choose us</h1>
    <div>
      <div class="row">
        <div class="col-md-4 row" v-for="pointer in pointers" :key="pointer">
          <div class="col-md-12">
            <img :src="pointer.icon" />
          </div>
          <div class="col-md-12">{{pointer.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pointers: [
        {
          icon: "https://img.icons8.com/wired/64/000000/budget.png",
          text: "Hot offers for any budget"
        },
        {
          icon:
            "https://img.icons8.com/pastel-glyph/64/000000/customer-support.png",
          text: "Round the clock support"
        },
        {
          icon: "https://img.icons8.com/ios/50/000000/features-list.png",
          text: "Genuine Reviews"
        },
        {
          icon: "https://img.icons8.com/wired/64/000000/performance.png",
          text: "Great Venue Options"
        },
        {
          icon:
            "https://img.icons8.com/ios/40/000000/spring-in-motion-filled.png",
          text: "Flexibile packages"
        },
        {
          icon: "https://img.icons8.com/ios/50/000000/add-list.png",
          text: "List your venue at Spacesly"
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
div.row {
  margin: 30px 0px;
}
div.col-md-8 {
  font-weight: 800;
}
</style>