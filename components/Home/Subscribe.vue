<template>
  <div class="row text-center mr-0">
    <div class="col-md-12">
      <h1 class="heading">Discover the exciting venues around Pakistan</h1>
      <h4 class="sub-heading my-4">Sign up and we will send the best deals to you</h4>
      <h6 class="message my-4" v-if="msg" :class="classToApply">{{ msg }}</h6>
      <div class="row col-md-8 col-sm-12 my-5 mx-auto px-0 wrapper">
        <div class="col-md-9 col-sm-12 px-0 h-100 email-div">
          <b-input
            class="col-md-12 input-element"
            id="inline-form-input-username"
            placeholder="Email here"
            :disabled="isLoading"
            v-model="email"
          ></b-input>
        </div>
        <div class="col-md-3 col-sm-12 px-0 h-100 subscribe-div">
          <b-button class="col-md-12 subscribe-button" squared @click="subscribe">SUBSCRIBE</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const SubscriptionRepository = RepositoryFactory.get("subscription");

export default {
  data() {
    return {
      email: null,
      isLoading: false,
      msg: null,
      classToApply: ""
    };
  },
  methods: {
    async subscribe() {
      this.isLoading = true;
      let { data } = await SubscriptionRepository.post(this.email);
      data = JSON.parse(data);
      this.isLoading = false;
      if (!data.success) {
        this.$message.error(data.user_message);
      } else {
        this.$message.success("Subscribed Successfully!");
      }
    }
  }
};
</script>

<style scoped>
@media (max-width: 425px) {
  .heading {
    font-weight: 500;
    font-size: 28px;
    padding: 10px;
  }
  .sub-heading {
    padding: 10px;
    font-weight: 300;
    font-size: 18px;
  }
  .wrapper {
    padding: 10px !important;
    margin: 0px !important;
    margin-bottom: 20px;
  }
  .email-div {
    margin-bottom: 10px;
  }
}
.sub-heading {
  font-weight: 300;
}
.message {
  font-weight: 200;
}
.message-success {
  color: green;
}
.message-error {
  color: red;
}
.heading {
  font-weight: 600;
}
.wrapper {
  height: 60px;
}
.input-element {
  border-radius: 0px;
  height: 100%;
}
.subscribe-button {
  background: linear-gradient(#ff4d78, #fa7649);
  border: none;
  font-size: 15px;
  font-weight: bolder;
  width: 100%;
  height: 100%;
  color: #ffffff;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.subscribe-button:after {
  content: "";
  background: linear-gradient(#ff4d78, #fa7649);
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
}

.subscribe-button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}
</style>
