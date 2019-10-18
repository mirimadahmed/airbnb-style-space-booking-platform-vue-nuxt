<template>
  <div class="main-wrapper">
    <div class="row m-0">
      <div class="col-md-12">
        <h1 class="heading">Now earn with your diverse spaces</h1>
      </div>
      <div
        class="col-md-4 sub-heading p-5"
        v-for="(space, index) in spaces"
        :key="index"
      >{{ space }}</div>
    </div>
    <div class="col-md-6 m-auto">
      <a-divider />
    </div>
    <div class="row m-0 p-2 mt-2">
      <div class="col-md-12">
        <h1 class="heading">We help spaces succeed</h1>
      </div>
    </div>
    <div class="row m-0 main-box p-3">
      <div class="col-md-4 border-right p-4">
        <h1 class="heading">Curated Marketplace</h1>
        <p
          class="sub-heading"
        >We aim to provide the most curated list of unique and beautiful venues in Pakistan to our 75,000+ monthly website visitors with more than 1,500 inquiries generated every month</p>
      </div>
      <div class="col-md-4 border-right p-4">
        <h1 class="heading">Event Business Intelligence Tools</h1>
        <p
          class="sub-heading"
        >Once you list on Spacesly, you are provided with a 24/7 access to the event inquiries management software that will help you analyze key metrics such as pageviews, conversion rate, call inquiries, and more.</p>
      </div>
      <div class="col-md-4 p-4">
        <h1 class="heading">End-to-end Support</h1>
        <p
          class="sub-heading"
        >You are not alone. With listing comes a dedicated account manager for your venue to ensure your venue's successful performance. We work together with you through the whole jurney.</p>
      </div>
    </div>
    <div class="row m-0 p-5">
      <div class="col-md-6 m-auto">
        <b-button class="signin-button">Get Started and List my space now</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spaces: ["Wedding", "Party", "Corporate", "Sports", "Production"]
    };
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
