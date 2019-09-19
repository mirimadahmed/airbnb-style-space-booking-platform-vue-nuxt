<template>
  <div>
    <h3>You have succesfully created your account</h3>
  </div>
</template>
<script>
export default {
  
  mounted() {
    console.log(this.$route.query.hash);
  }
  
};
</script>

