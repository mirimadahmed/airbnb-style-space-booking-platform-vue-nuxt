<template>
  <div class="m-5 p-4">
    <div class="row">
      <h3>My Listings</h3>
      <div class="col-md-12 px-0">
        <div class="row" v-if="!isLoading && listings.length === 0">
          <div class="col-md-12 my-2">Create a listing now.</div>
        </div>
        <a-list
          class="demo-loadmore-list text-left col-md-6 px-0"
          :loading="isLoading"
          itemLayout="horizontal"
          :dataSource="listings"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a slot="actions" :href="`/listing/${item.Entity.permalink}`">edit</a>
            <a
              v-if="item.Entity.status === 'approved'"
              slot="actions"
              :href="`/${item.Entity.permalink}`"
            >view</a>
            <a slot="actions" @click="deleteListing(item.Entity.permalink)">delete</a>
            <a-list-item-meta :description="item.Entity.description">
              <a slot="title">{{item.Entity.name}}</a>
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
    ...mapGetters(["listings"])
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.isLoading = true;
      const { data } = await ListingRepository.getAll(1);
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
