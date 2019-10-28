<template>
  <div id="search-bar">
    <div class="form row p-0 mb-5" inline>
      <div class="col-md-6 p-0 my-2">
        <a-select size="large" class="col-md-12" placeholder="Type of Event" @change="saveType">
          <a-select-option v-for="(type, i) in types" :key="i">{{ type }}</a-select-option>
        </a-select>
      </div>
      <!-- <div class="col-md-2">
        <b-form-input
          class="border"
          list="my-list-id2"
          placeholder="What are you planning?"
          v-model="query.activity"
        ></b-form-input>
        <datalist id="my-list-id2">
          <option v-for="(what, i) in whats" :key="i">{{ what }}</option>
        </datalist>
      </div>
      <div class="col-md-2">
        <no-ssr>
          <date-picker
            placeholder="When?"
            v-model="query.when"
            input-class="form-control h-100 border-0 rounded-0"
            class="form-control p-0 border"
            :lang="lang"
            :not-before="new Date()"
          />
        </no-ssr>
      </div>
      <div class="col-md-2">
        <b-input class="border" placeholder="Where?" v-model="query.where" />
      </div>-->
      <div class="col-md-6 p-0 my-2">
        <a-input-number
          class="number-input-fix"
          size="large"
          :min="1"
          :max="100000"
          v-model="query.capacity"
          placeholder="No. of guests"
        />
      </div>
      <!-- <div class="col-md-2 m-auto">
        Show Map
        <a-switch class="ml-3" defaultChecked v-model="mapOn" />
      </div>-->
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const SystemListRepository = RepositoryFactory.get("systemlist");

export default {
  data() {
    return {
      mapOn: true,
      lang: {
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        pickers: [
          "next 7 days",
          "next 30 days",
          "previous 7 days",
          "previous 30 days"
        ],
        placeholder: {
          date: "Select Date",
          dateRange: "Select Date Range"
        }
      },
      disabledDates: {
        to: new Date()
      },
      types: ["Wedding", "Party", "Corporate"],
      query: {
        type: null,
        activity: null,
        when: null,
        where: null,
        capacity: null
      },
      list: []
    };
  },
  created() {
    this.updateMyQuery();
    this.fetch();
  },
  methods: {
    saveType(res) {
      this.query.type = this.types[res];
    },
    async fetch() {
      const { data } = await SystemListRepository.get();
      this.list = data;
    },
    getSearchResults() {
      let path = "/search/type=" + this.query.type;
      if (this.query.activity) path = path + "&activity=" + this.query.activity;
      if (this.query.when) {
        this.query.when = moment(this.query.when).format("YYYY-MM-DD");
        path = path + "&when=" + this.query.when;
      }
      if (this.query.where) path = path + "&where=" + this.query.where;
      if (this.query.capacity) path = path + "&capacity=" + this.query.capacity;
      this.$router.push({ path: path });
    },
    getTypeId(type) {
      switch (type) {
        case "Wedding":
          return 1;
        case "Party":
          return 2;
        case "Corporate":
          return 3;
        case "Sports":
          return 4;
        case "Studio":
          return 5;
      }
    },
    updateMyQuery() {
      let queryString = this.$route.params.query.split("&");
      queryString.forEach(str => {
        let keyVal = str.split("=");
        this.query[keyVal[0]] = keyVal[1];
      });
    }
  },
  watch: {
    mapOn() {
      this.$emit("map-changed", this.mapOn);
    },
    query: {
      deep: true,
      handler(newValue) {
        this.getSearchResults();
      }
    }
  },
  computed: {
    whats() {
      if (this.query.type) {
        let type = this.getTypeId(this.query.type);
        let index = this.list.findIndex(item => item.type_id === type);
        if (index > -1)
          return this.list[index].list_values.map(item => item.value);
      }
      return ["Select type first"];
    }
  }
};
</script>

<style scoped>
.wrapper {
  background: white;
}
.form-control {
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 0px;
  font-weight: 500;
}
.custom-select {
  border: none;
  width: 100%;
  border-radius: 0px;
  font-weight: 500;
  height: 100%;
}
.form {
  margin-left: 0px;
  margin-right: 0px;
  height: 50px;
}
.search-button {
  background: linear-gradient(#ff4d78, #fa7649);
  border: none;
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  height: 100%;
}
.number-input-fix {
  width: 100% !important;
}
</style>
