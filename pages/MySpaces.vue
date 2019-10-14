<template>
  <div class="m-5 p-4">
    <div class="row p-0">
      <div class="col-md-2 text-left m-0 p-0">
        <h3>My Spaces</h3>
      </div>
      <div class="col-md-10 text-right m-0 p-0">
        <a-button type="primary" href="/addspace">Create New Space</a-button>
      </div>
      <div class="col-md-12 px-0">
        <a-list
          class="demo-loadmore-list text-left col-md-12 px-0"
          :loading="isLoading"
          itemLayout="horizontal"
          :dataSource="listings"
        >
          <a-list-item class="border p-3 my-2" slot="renderItem" slot-scope="item, index">
            <a slot="actions" :href="`/addspace/${item.Entity.permalink}`">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </a>
            <a
              v-if="item.Entity.status === 'approved'"
              slot="actions"
              :href="`/${item.Entity.permalink}`"
              target="_blank"
            >view</a>
            <a-popconfirm
              title="Are you sure delete this listing?"
              @confirm="deleteListing(item.Entity.permalink)"
              okText="Yes"
              cancelText="No"
              slot="actions"
            >
              <a href="#">
                <i class="fa fa-trash-o" style="color:red;" aria-hidden="true"></i>
              </a>
            </a-popconfirm>

            <a-list-item-meta>
              <a slot="title">{{item.Entity.name}}</a>
              <b-badge
                v-if="item.Entity.status=='pending'"
                slot="description"
                variant="warning"
              >{{item.Entity.status}}</b-badge>
              <b-badge
                v-else-if="item.Entity.status=='submitted'"
                slot="description"
                variant="primary"
              >{{item.Entity.status}}</b-badge>
              <b-badge
                v-else-if="item.Entity.status=='approved'"
                slot="description"
                variant="success"
              >{{item.Entity.status}}</b-badge>
              <p slot="description">{{item.Entity.description}}</p>
              <a-progress slot="description" :percent="find_percentage(item.Entity)" size="small" />
            </a-list-item-meta>
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
    ...mapGetters(["listings", "user"])
  },
  middleware: "auth",
  created() {
    this.fetch();
  },
  methods: {
    find_percentage(item) {
      let percentg = 75;
      if (item.timings_conf.length > 0) {
        percentg = percentg + 25;
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
