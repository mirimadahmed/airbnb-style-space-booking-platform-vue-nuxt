<template>
  <div id="search-bar" class="border-bottom">
    <div class="form row p-2" inline>
      <div class="col-md-2">
        <b-form-input class="border" list="my-list-id" placeholder="What are you planning?" v-model="query.type"></b-form-input>
        <datalist id="my-list-id">
          <option v-for="(type, i) in types" :key="i">{{ type }}</option>
        </datalist>
      </div>
      <div class="col-md-2">
        <b-form-input
          class="border"
          list="my-list-id2"
          placeholder="What are you planning?"
          v-model="query.what"
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
        <b-input class="border" id="search" placeholder="Where?" v-model="query.where" />
      </div>
      <div class="col-md-2">
        <b-input
          id="capacity"
          class="border"
          placeholder="No. of Guests"
          type="number"
          min="0"
          v-model="query.count"
        />
      </div>
      <div class="col-md-2"></div>
      <div class="col-md-2">
        Show Map
        <a-switch defaultChecked v-model="mapOn" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const SystemListRepository = RepositoryFactory.get("systemlist");

export default {
  props: {
    search: {
      type: Object,
      required: true
    }
  },
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
      types: ["Wedding", "Party", "Corporate", "Sports", "Studio"],
      query: {
        type: null,
        what: null,
        when: null,
        where: null,
        count: null
      },
      list: []
    };
  },
  created() {
    this.updateOptions();
    this.fetch();
  },
  methods: {
    async fetch() {
      const { data } = await SystemListRepository.get();
      this.list = data;
    },
    getSearchResults() {
      let path = "/search?type=" + this.query.type;
      if (this.query.what) path = path + "&activity=" + this.query.what;
      if (this.query.when) {
        this.query.when = moment(this.query.when).format("YYYY-MM-DD");
        path = path + "&when=" + this.query.when;
      }
      if (this.query.where) path = path + "&where=" + this.query.where;
      if (this.query.count) path = path + "&capacity=" + this.query.count;
      this.$router.push({ path: path });
    },
    updateOptions() {
      let options = this.search;
      if (options.type) {
        this.query.type = options.type;
      }
      if (options.activity) {
        this.query.what = options.activity;
      }
      if (options.when) {
        this.query.when = options.when;
      }
      if (options.where) {
        this.query.where = options.where;
      }
      if (options.capacity) {
        this.query.count = options.capacity;
      }
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
    }
  },
  watch: {
    mapOn() {
      this.$emit("map-changed", this.mapOn);
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
</style>
