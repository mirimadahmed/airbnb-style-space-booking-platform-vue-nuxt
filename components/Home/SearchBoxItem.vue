<template>
  <div>
    <div class="middle-wrapper col-md-12">
      <div class="heading">
        <h1 class="d-none d-md-block">What do you want to host today?</h1>
      </div>
      <b-tabs class="text-center search d-none d-md-block" v-model="tabIndex">
        <b-tab title="Wedding" :title-link-class="linkClass(0)" class="tab-item" active>
          <template slot="title">
            <span>
              <i class="fa fa-birthday-cake" aria-hidden="true"></i> &nbsp; Wedding
            </span>
          </template>
          <div class="form row" inline>
            <div class="col-md-3 item-wrapper">
              <b-form-input
                list="my-list-id"
                v-model="query.what"
                placeholder="What are you planning?"
              ></b-form-input>
              <datalist id="my-list-id">
                <option v-for="(item, i) in items" :key="i">{{ item }}</option>
              </datalist>
            </div>
            <div class="col-md-2 item-wrapper">
              <no-ssr>
                <date-picker
                  placeholder="When?"
                  v-model="query.when"
                  input-class="form-control h-100 border-0 rounded-0"
                  class="form-control p-0"
                  :lang="lang"
                  :not-before="new Date()"
                />
              </no-ssr>
            </div>
            <div class="col-md-3 item-wrapper">
              <gmap-autocomplete id="search" class="form-control" placeholder="Where?"></gmap-autocomplete>
            </div>
            <div class="col-md-2 item-wrapper last-tab">
              <b-input
                id="capacity"
                type="number"
                min="0"
                placeholder="No. of Guests"
                v-model="query.count"
              />
            </div>
            <div class="col-md-2 item-wrapper last-tab">
              <b-button @click="getSearchResults" squared class="search-button">SEARCH</b-button>
            </div>
          </div>
        </b-tab>
        <b-tab
          title="Party"
          :title-link-class="linkClass(1)"
          class="tab-item glyphicon glyphicon-asterisk"
        >
          <template slot="title">
            <span>
              <i class="fa fa-glass" aria-hidden="true"></i> &nbsp; Party
            </span>
          </template>
          <div class="form row" inline>
            <div class="col-md-3 item-wrapper">
              <b-form-input
                list="my-list-id"
                placeholder="What are you planning?"
                v-model="query.what"
              ></b-form-input>
              <datalist id="my-list-id">
                <option v-for="(item, i) in items" :key="i">{{ item }}</option>
              </datalist>
            </div>
            <div class="col-md-2 item-wrapper">
              <no-ssr>
                <date-picker
                  placeholder="When?"
                  v-model="query.when"
                  input-class="form-control h-100 border-0 rounded-0"
                  class="form-control p-0"
                  :lang="lang"
                  :not-before="new Date()"
                />
              </no-ssr>
            </div>
            <div class="col-md-3 item-wrapper">
              <!-- <b-input id="search" placeholder="Where?" v-model="query.where" /> -->
              <gmap-autocomplete id="search" class="form-control" placeholder="Where?"></gmap-autocomplete>
            </div>
            <div class="col-md-2 item-wrapper last-tab">
              <b-input
                id="capacity"
                placeholder="No. of Guests"
                type="number"
                min="0"
                v-model="query.count"
              />
            </div>
            <div class="col-md-2 item-wrapper last-tab">
              <b-button @click="getSearchResults" squared class="search-button">SEARCH</b-button>
            </div>
          </div>
        </b-tab>
        <b-tab title="Corporate" :title-link-class="linkClass(2)" class="tab-item">
          <template slot="title">
            <span>
              <i class="fa fa-briefcase" aria-hidden="true"></i> &nbsp; Corporate
            </span>
          </template>
          <div class="form row" inline>
            <div class="col-md-3 item-wrapper">
              <b-form-input
                list="my-list-id"
                placeholder="What are you planning?"
                v-model="query.what"
              />
              <datalist id="my-list-id">
                <option v-for="(item, i) in items" :key="i">{{ item }}</option>
              </datalist>
            </div>
            <div class="col-md-2 item-wrapper">
              <no-ssr>
                <date-picker
                  placeholder="When?"
                  v-model="query.when"
                  input-class="form-control h-100 border-0 rounded-0"
                  class="form-control p-0"
                  :lang="lang"
                  :not-before="new Date()"
                />
              </no-ssr>
            </div>
            <div class="col-md-2 item-wrapper">
              <gmap-autocomplete id="search" class="form-control" placeholder="Where?"></gmap-autocomplete>
            </div>
            <div class="col-md-3 item-wrapper last-tab">
              <b-input
                id="capacity"
                placeholder="No. of Guests"
                type="number"
                min="0"
                v-model="query.count"
              />
            </div>
            <div class="col-md-2 item-wrapper last-tab">
              <b-button @click="getSearchResults" squared class="search-button">SEARCH</b-button>
            </div>
          </div>
        </b-tab>
        <b-tab title="Sports" :title-link-class="linkClass(3)" class="tab-item">
          <template slot="title">
            <span>
              <i class="fa fa-futbol-o" aria-hidden="true"></i> &nbsp; Sports
            </span>
          </template>
          <div class="form row" inline>
            <div class="col-md-4 item-wrapper">
              <b-form-input
                list="my-list-id"
                placeholder="What are you planning?"
                v-model="query.what"
              />
              <datalist id="my-list-id">
                <option v-for="(item, i) in items" :key="i">{{ item }}</option>
              </datalist>
            </div>
            <div class="col-md-3 item-wrapper">
              <no-ssr>
                <date-picker
                  placeholder="When?"
                  v-model="query.when"
                  input-class="form-control h-100 border-0 rounded-0"
                  class="form-control p-0"
                  :lang="lang"
                  :not-before="new Date()"
                />
              </no-ssr>
            </div>
            <div class="col-md-3 item-wrapper">
              <gmap-autocomplete id="search" class="form-control" placeholder="Where?"></gmap-autocomplete>
            </div>
            <div class="col-md-2 item-wrapper last-tab">
              <b-button @click="getSearchResults" squared class="search-button">SEARCH</b-button>
            </div>
          </div>
        </b-tab>
        <b-tab title="Studio" class="tab-item" :title-link-class="linkClass(4)">
          <template slot="title">
            <span>
              <i class="fa fa-camera" aria-hidden="true"></i> &nbsp;Studio
            </span>
          </template>
          <div class="form row" inline>
            <div class="col-md-3 item-wrapper">
              <b-form-input
                list="my-list-id"
                placeholder="What are you planning?"
                v-model="query.what"
              />
              <datalist id="my-list-id">
                <option v-for="(item, i) in items" :key="i">{{ item }}</option>
              </datalist>
            </div>
            <div class="col-md-3 item-wrapper">
              <no-ssr>
                <date-picker
                  placeholder="When?"
                  v-model="query.when"
                  input-class="form-control h-100 border-0 rounded-0"
                  class="form-control p-0"
                  :lang="lang"
                  :not-before="new Date()"
                />
              </no-ssr>
            </div>
            <div class="col-md-4 item-wrapper last-tab">
              <gmap-autocomplete id="search" class="form-control" placeholder="Where?"></gmap-autocomplete>
            </div>
            <div class="col-md-2 item-wrapper last-tab">
              <b-button @click="getSearchResults" squared class="search-button">SEARCH</b-button>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>

    <div class="row d-none d-block d-xl-none d-lg-none d-md-none p-2 m-2">
      <div class="col-sm-12 py-3 phone-item shadow-sm">
        <b-form-input list="my-list-id" v-model="tabIndex" placeholder="Type of event?"></b-form-input>
        <datalist id="my-list-id">
          <option v-for="(item, i) in list" :key="i">{{ item }}</option>
        </datalist>
      </div>
      <div class="col-sm-12 py-3 phone-item shadow-sm">
        <b-form-input list="my-list-id" v-model="query.what" placeholder="What are you planning?"></b-form-input>
        <datalist id="my-list-id">
          <option v-for="(item, i) in items" :key="i">{{ item }}</option>
        </datalist>
      </div>
      <div class="col-sm-12 py-3 phone-item shadow-sm">
        <no-ssr>
          <date-picker
            placeholder="When?"
            v-model="query.when"
            input-class="form-control h-100 border-0 rounded-0"
            class="form-control p-0"
            :lang="lang"
            :not-before="new Date()"
          />
        </no-ssr>
      </div>
      <div class="col-sm-12 py-3 phone-item shadow-sm">
        <gmap-autocomplete id="search" class="form-control" placeholder="Where?"></gmap-autocomplete>
      </div>
      <div class="col-sm-12 py-3 phone-item shadow-sm">
        <b-input
          id="capacity"
          placeholder="No. of Guests"
          type="number"
          min="0"
          v-model="query.count"
        />
      </div>
      <div class="col-sm-12 py-3">
        <b-button @click="getSearchResults" squared class="search-button">SEARCH</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const SystemListRepository = RepositoryFactory.get("systemlist");

export default {
  components: {},
  data() {
    return {
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
      tabIndex: 0,
      selected: "Islamabad",
      options: [
        { value: "Islamabad", text: "Islamabad" },
        { value: "RawalPindi", text: "RawalPindi" }
      ],
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
    this.fetch();
  },
  computed: {
    items() {
      let type = this.tabIndex + 1;
      let index = this.list.findIndex(item => item.type_id === type);
      if (index > -1)
        return this.list[index].list_values.map(item => item.value);
      return [];
    }
  },
  methods: {
    async fetch() {
      const { data } = await SystemListRepository.get();
      this.list = data;
    },
    getSearchResults() {
      console.log("here");
      let type = "";
      switch (this.tabIndex) {
        case 0:
          type = "Wedding";
          break;
        case 1:
          type = "Party";
          break;
        case 2:
          type = "Corporate";
          break;
        case 3:
          type = "Sports";
          break;
        case 4:
          type = "Studio";
          break;
      }
      this.query.type = type;
      let path = "/search/type=" + this.query.type;
      if (this.query.what) path = path + "&activity=" + this.query.what;
      if (this.query.when) {
        this.query.when = moment(this.query.when).format("YYYY-MM-DD");
        path = path + "&when=" + this.query.when;
      }
      if (this.query.where) path = path + "&where=" + this.query.where;
      if (this.query.count) path = path + "&capacity=" + this.query.count;
      this.$router.push({ path: path });
    },
    linkClass(idx) {
      let classes = [];
      classes.push("nav-link-no-border");
      if (this.tabIndex === idx) {
        classes.push("bg-selected");
        classes.push("shaddow-sm");
      } else
        switch (idx) {
          case 0:
            classes.push("bg-one");
            break;
          case 1:
            classes.push("bg-two");
            break;
          case 2:
            classes.push("bg-three");
            break;
          case 3:
            classes.push("bg-four");
            break;
          case 4:
            classes.push("bg-five");
            break;
        }
      return classes;
    }
  }
};
</script>


<style scoped>
.vdp-datepicker .form-group .form-control {
  background: none;
}
.phone-item .form-control {
  background: none;
}
.heading > h1 {
  color: white;
  font-weight: 600;
  font-size: 50px;
}
.heading {
  text-align: left;
  margin: 8vh auto;
  width: 70vw;
}
.search {
  margin: 0px auto;
  width: 70vw;
  padding-left: 0px;
}
.tab-item {
  background: white;
  text-shadow: none;
}
.last-tab {
  border-right: none !important;
}
.middle-wrapper {
  position: absolute;
  z-index: 10;
}
.icon {
  padding: 20px;
  background-color: white;
  color: grey;
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
  margin-top: -1px;
  margin-left: 0px;
  margin-right: 0px;
  height: 50px;
}
.item-wrapper {
  padding: 0px;
  border-right: 1px solid grey;
}
.search-button {
  background: linear-gradient(#ff4d78, #fa7649);
  font-weight: 600;
  border: none;
  font-size: 14px;
  width: 100%;
  height: 100%;

  position: relative;
  /* background-color: #4CAF50; */
  border: none;
  /* font-size: 28px; */
  color: #ffffff;
  /* padding: 20px; */
  /* width: 200px; */
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}

.search-button:after {
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

.search-button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}
</style>
