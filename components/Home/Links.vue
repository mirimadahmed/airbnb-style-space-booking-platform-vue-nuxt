<template>
  <div class="row p-0 m-0 mt-5">
    <div class="col-md-4" v-for="(links, i) in mainLinks" :key="i">
      <div v-for="(link, j) in links" :key="j" class="py-3">
        <a :href="'https://www.spacesly.com' + link.link" class="home-links">{{link.text}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainLinks: [
        [
          {
            link: "/search?type=Wedding",
            text: "Wedding venues in Islamabad"
          },
          {
            link: "/search?type=Wedding",
            text: "Wedding venues in Islamabad"
          },
          {
            link: "/search?type=Wedding",
            text: "Wedding venues in Islamabad"
          }
        ],
        [
          {
            link: "/search?type=Wedding",
            text: "Wedding venues in Islamabad"
          },
          {
            link: "/search?type=Wedding",
            text: "Wedding venues in Islamabad"
          },
          {
            link: "/search?type=Wedding",
            text: "Wedding venues in Islamabad"
          }
        ],
        [
          {
            link: "/search?type=Wedding",
            text: "Wedding venues in Islamabad"
          },
          {
            link: "/search?type=Wedding",
            text: "Wedding venues in Islamabad"
          },
          {
            link: "/search?type=Wedding",
            text: "Wedding venues in Islamabad"
          }
        ]
      ]
    };
  }
};
</script>

<style scoped>
.home-links {
  cursor: pointer;
  font-weight: 400;
  font-size: 15px;
}
</style>
