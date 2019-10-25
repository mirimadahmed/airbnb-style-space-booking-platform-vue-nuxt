<template>
  <div class="main-wrapper">
    <img src="https://spacesly.s3.amazonaws.com/Webp.net-resizeimage.png" class="object-fit" />
    <div class="main-content">
      <div class="typer"></div>
      <div class="search-bar"></div>
      <div class="steps"></div>
    </div>
  </div>
</template>

<script>
export default {};
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
  top: 50%;
  z-index: 10;
  width: 100%;
  text-align: center;
}
.typer {
}
.search-bar {
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  width: 60%;
  margin: auto;
}
.steps {
}
</style>
