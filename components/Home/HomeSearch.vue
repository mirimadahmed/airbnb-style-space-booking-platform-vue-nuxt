<template>
  <div class="main-wrapper">
    <img src="https://spacesly.s3.amazonaws.com/Webp.net-resizeimage.png" class="object-fit" />
    <div class="main-content">
      <Typer />
      <div class="search-bar"></div>
      <div class="steps row">
        <div class="col-md-4">Search</div>
        <div class="col-md-4">Compare</div>
        <div class="col-md-4">Book</div>
      </div>
    </div>
  </div>
</template>

<script>
import Typer from "./Typer";

export default {
  components: {
    Typer
  }
};
</script>

<style scoped>
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
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  width: 60%;
  margin: 2vh auto;
}
.steps {
  width: 60%;
  margin: 2vh auto;
  font-weight: 400;
  color: white;
  font-size: 20px;
}
</style>
