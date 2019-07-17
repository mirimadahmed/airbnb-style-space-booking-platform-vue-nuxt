<template>
  <div class="m-5 text-left">
    <div class="row p-4">
      <div class="col-md-12 mb-4">
        <h1>Change Log</h1>
      </div>
      <div class="col-md-12" v-for="change in changes" :key="change.version">
        <span class="font-weight-bolder">{{change.version}}</span>
        {{change.msg}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      changes: [
        {
          version: "0.0.1",
          msg: "Created the base version"
        },
        {
          version: "0.0.2",
          msg: "Created the base version"
        },
        {
          version: "0.0.3",
          msg: "Created the base version"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
