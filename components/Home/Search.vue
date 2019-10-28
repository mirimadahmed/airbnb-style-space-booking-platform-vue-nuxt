<template>
  <div class="col-md-12 h-100 row m-0 p-0">
    <div class="col-md-5 p-0 input-item">
      <a-select size="large" class="col-md-12" placeholder="Type of Event" @change="saveType">
        <a-select-option v-for="(item, i) in list" :key="i">{{item}}</a-select-option>
      </a-select>
    </div>
    <div class="col-md-4 input-item">
      <a-input-number
        class="number-input-fix"
        size="large"
        :min="1"
        :max="100000"
        v-model="query.count"
        placeholder="No. of guests"
      />
    </div>
    <div class="col-md-3 p-0 input-item">
      <a-button class="col-md-12" type="primary" size="large" @click="getSearchResults">Search</a-button>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const SystemListRepository = RepositoryFactory.get("systemlist");
export default {
  data() {
    return {
      list: ["Wedding", "Party", "Corporate"],
      query: {
        type: null,
        count: null
      }
    };
  },
  methods: {
    saveType(res) {
      this.query.type = this.list[res];
    },
    getSearchResults() {
      if (this.query.type === null) {
        this.$message.error("Select event type first");
        return;
      }
      let path = "/search/type=" + this.query.type;
      if (this.query.count) path = path + "&capacity=" + this.query.count;
      this.$router.push({ path: path });
    }
  }
};
</script>

<style scoped>
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .input-item {
    padding: 0px !important;
    margin: 5px 0px;
  }
}
.number-input-fix {
  width: 100% !important;
}
</style>
