<template>
  <div class="wrapper text-left">
    <div class="row">
      <div class="col-md-3">
        <div class="col-md-12 p-0">
          <img src="/logo.png" width="120px" alt="Spacesly" />
        </div>
        <div class="col-md-12 p-0 contact mt-3">Email: contact@spacesly.com</div>
        <!-- <div class="col-md-12 p-0 contact">Mobile: +92 3135717756</div> -->
      </div>
      <div class="col-md-3">
        <h5 class="heading">Company</h5>
        <ul>
          <li>
            <router-link to="/about">About</router-link>
          </li>
          <li>
            <router-link to="/partners">Partners</router-link>
          </li>
          <li>
            <router-link to="/changelog">Change Log</router-link>
          </li>
          <li>
            <router-link to="/privacy">Privacy Policy</router-link>
          </li>
          <li>
            <router-link to="/terms">Terms and Conditions</router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-3"></div>
    </div>
    <div class="row" style="text-align:center;">
      <div class="col-md-12">
        <p>
          Designed & Developed with
          <i class="fa fa-heart" aria-hidden="true"></i> by
          <a
            target="_blank"
            style="color:white;"
            href="http://www.serics.com"
          >Serics Technologies</a>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    viewPage(page) {
      this.$router.push(page);
    }
  }
};
</script>


<style scoped>
@media (max-width: 425px) {
  .wrapper {
    text-align: center !important;
  }
  .wrapper .col-md-3 {
    margin-bottom: 20px !important;
  }
}
.wrapper {
  color: white;
  padding: 10px;
  background: #343840;
  margin-left: 0px !important;
  margin-right: 0px !important;
  background: #343840;
  border-top: 0.5px solid rgba(189, 189, 189, 0.637);
  margin-top: 200px;
  /* margin-bottom: 0px; */
  padding-top: 30px;
}
.contact,
.copy,
.copy a {
  font-weight: 600;
  font-size: 12px;
  color: #6a707a !important;
}
.heading {
  font-weight: 500;
  color: #6a707a !important;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0px;
}
ul li a {
  font-size: 12px;
  font-weight: 600;
  color: white !important;
  margin-top: 30px;
}
</style>


