<template>
  <b-card
    @click="viewDetails"
    :title="company.name"
    :img-src="company.featured_image"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2 text-left"
    border-variant="light"
  >
    <b-card-text>
      {{ address }}
      <StarRating :value="3.5" :noOfRatings="40" />
    </b-card-text>
  </b-card>
</template>

<script>
import StarRating from "./StarRating.vue";
export default {
  components: {
    StarRating
  },
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewDetails() {
      this.$router.push({ path: "/" + this.company.permalink });
    }
  },
  computed: {
    address() {
      let addressWords = this.company.address.split(" ");
      return addressWords.length > 5
        ? addressWords.slice(0, 6).concat(" ") + "..."
        : this.company.address;
    }
  }
};
</script>

<style scoped>
.amount {
  font-weight: 600;
  font-size: 18px;
  color: #54a0ff;
}
.per {
  font-weight: 400;
  font-size: 14px;
}
.image-area {
  height: 60%;
}
.company {
  width: 100%;
  height: 400px;
}
.title {
  font-weight: 500;
  font-size: 20px;
}
.address {
  font-weight: 300;
  font-size: 12px;
}
.details-button {
  background: linear-gradient(#ff4d78, #fa7649);
  border: 1px solid #ff4d78;
  font-size: 12px;
  padding: 10px 20px;
  color: white;
  font-weight: 600;
}
</style>
