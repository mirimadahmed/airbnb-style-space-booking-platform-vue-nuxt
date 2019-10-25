<template>
  <div class="main-wrapper">
    <img
      src="https://spacesly.s3.amazonaws.com/Webp.net-resizeimage.png"
      class="object-fit d-none d-md-block"
    />
    <div class="main-content">
      <Typer />
      <div class="search-bar">
        <Search />
      </div>
      <div class="steps row">
        <div class="step-item">Search</div>
        <div class="step-item">Compare</div>
        <div class="step-item">Book</div>
      </div>
    </div>
  </div>
</template>

<script>
import Typer from "./Typer";
import Search from "./Search";

export default {
  components: {
    Typer,
    Search
  }
};
</script>

<style scoped>
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .main-content {
    position: unset !important;
    margin-top: 5vh;
  }
  .search-bar {
    padding: 10px !important;
    width: 90% !important;
  }
  .steps {
    width: 60% !important;
    margin: 3vh auto !important;
    font-size: 18px !important;
    color: black !important;
  }
  .main-wrapper {
    height: auto !important;
    padding: 10px 0 !important;
  }
}

.main-wrapper {
  height: 80vh;
  width: 100%;
}
.object-fit {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.main-content {
  position: absolute;
  left: 0;
  top: 30%;
  z-index: 10;
  width: 100%;
  text-align: center;
}
.search-bar {
  padding: 5px;
  background: rgba(0, 0, 0, 0.5);
  width: 60%;
  margin: 2vh auto;
}
.steps {
  width: 40%;
  margin: 2vh auto;
  font-weight: 400;
  color: white;
  font-size: 20px;
  font-weight: 600;
}
.step-item {
  width: 33%;
}
</style>
