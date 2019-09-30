<template>
    <div class="m-5 p-4">
      <div class="row">
        <div class="col-md-2" style="padding-left: 0px;margin-left: -1.5rem;">
          <h3>My Spaces</h3>
        </div>
        <div class="col-md-10 text-right">
          <a-button type="primary" href="/addspace">Create New Space</a-button>
        </div>
        <div class="col-md-12 px-0">
          <a-list
            class="demo-loadmore-list text-left col-md-6 px-0"
            :loading="isLoading"
            itemLayout="horizontal"
            :dataSource="listings"
          >
            <a-list-item 
             class="shadow"
             style="margin-top:15px;
             padding:14px;
             border:20x;
             border-color: #dcdcdc;"
             slot="renderItem" slot-scope="item, index">
              <a slot="actions" :href="`/addspace/${item.Entity.permalink}`">
              <i class="fa fa-pencil" aria-hidden="true"></i>
              </a>
              <a
                v-if="item.Entity.status === 'approved'"
                slot="actions"
                :href="`/${item.Entity.permalink}`"
              >view</a>
              <a slot="actions" @click="deleteListing(item.Entity.permalink)">
                <i class="fa fa-trash-o" style="color:red;" aria-hidden="true"></i>
              </a>
              <a-list-item-meta :description="item.Entity.description">
                <a slot="title">{{item.Entity.name}}</a>
                <a-avatar slot="avatar" :src="item.Entity.featured_image" />
                <!-- <a-progress slot="footer" :percent="10" size="small" />  -->
              </a-list-item-meta>
              <a-progress :percent="find_percentage(item.Entity)" size="small" />
                  <!-- <div slot="footer">Footer</div> -->

            </a-list-item>
          </a-list>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { RepositoryFactory } from "@/repository/RepositoryFactory";
const ListingRepository = RepositoryFactory.get("listings");
export default {
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapGetters(["listings", "user"]),
  },
  middleware: "auth",
  created() {
    this.fetch();
  },
  methods: {
     find_percentage(item) {
      let percentg=75
      if(item.timings_conf.length>0) {
        percentg=percentg+25
      }
      return percentg;
    },
    async fetch() {
      this.isLoading = true;
      const { data } = await ListingRepository.getAll(this.user.company_id);
      this.$store.dispatch("setListings", data);
      this.isLoading = false;
    },
    async deleteListing(permalink) {
      this.isLoading = true;
      const { data } = await ListingRepository.deleteListing(permalink);
      if (data.success) {
        this.$store.dispatch("deleteListing", permalink);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
