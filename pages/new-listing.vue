<template>
  <div class="main-wrapper">
    <div class="row m-0">
      <div class="col-md-12">
        <h1 class="heading font-weight-bolder">Now earn with your diverse spaces</h1>
      </div>
      <div class="col-md-4 p-5 row m-0" v-for="(space, index) in spaces" :key="index">
        <div class="col-md-12">
          <img :src="space.icon" alt />
        </div>
        <div class="col-md-12 sub-heading font-weight-bold mt-3">{{ space.text }}</div>
      </div>
      <div class="col-md-4 m-auto">
        <b-button class="signin-button" @click="newListing">Get Started</b-button>
      </div>
    </div>
    <div class="row m-0 main-box p-3">
      <div class="col-md-4 border-right p-4">
        <h1 class="heading font-weight-bolder">FREE Marketplace</h1>
        <p
          class="section-text mt-3"
        >We aim to provide the most curated list of unique and beautiful venues in Pakistan.</p>
        <p class="section-text mt-3">
          We make money when you make money. We only charge
          <span
            class="font-weight-bolder"
          >12% commission</span> on each booking otherwise the listing on this platform is free.
        </p>
      </div>
      <div class="col-md-4 border-right p-4">
        <h1 class="heading font-weight-bolder">Intelligence Tools</h1>
        <p class="section-text mt-3">
          Once you list on Spacesly, you are provided with a
          <span
            class="font-weight-bolder"
          >24/7 access</span> to the event inquiries management software that will help you analyze key metrics such as pageviews, conversion rate, call inquiries, and more.
        </p>
      </div>
      <div class="col-md-4 p-4">
        <h1 class="heading font-weight-bolder">End-to-end Support</h1>
        <p class="section-text mt-3">
          You are not alone. With listing comes a
          <span
            class="font-weight-bolder"
          >dedicated account manager</span> for your venue to ensure your venue's successful performance. We work together with you through the whole journey.
        </p>
      </div>
    </div>
    <div class="row m-0 p-5">
      <div class="col-md-6 m-auto">
        <b-button class="signin-button" @click="newListing">Get started and list my space now</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spaces: [
        {
          icon: "/wedding.png",
          text: "Wedding"
        },
        {
          icon: "/party.png",
          text: "Party"
        },
        {
          icon: "/corporate.png",
          text: "Corporate"
        },
        {
          icon: "/sports.png",
          text: "Sports"
        },
        {
          icon: "/production.png",
          text: "Production"
        }
      ]
    };
  },
  methods: {
    newListing() {
      this.$router.push("/addspace");
    }
  }
};
</script>

<style scoped>
.main-wrapper {
  width: 80%;
  padding: 35px;
  margin: 20px auto;
}
.main-box {
  border: 1px solid chocolate;
}
.signin-button {
  border-radius: 0rem;
  border: 2px solid #ff4d78;
  background: white;
  color: black;
}
.signin-button:hover {
  border: 2px solid #ff4d78;
  background: linear-gradient(#ff4d78, #fa7649);
  color: white;
}
.signin-button:active {
  border: 2px solid #ff4d78;
  background: linear-gradient(#ff4d78, #fa7649);
  color: white;
}
</style>
