<template>
  <div class="m-5 p-4 text-left">
    <div class="row">
      <div class="col-md-4">
        <img src="/eventsia.png" alt="Event management company in Pakistan" class="col-md-12" />
      </div>
    </div>
    <div class="row mt-5 text-center">
      <div class="col-md-12">
        <h1 class="top-heading">Premium event management services</h1>
      </div>
      <div class="col-md-4 row p-4" v-for="pointer in pointers" :key="pointer">
        <div class="col-md-12">
          <img :src="pointer.icon" />
        </div>
        <div class="col-md-12">{{pointer.text}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <b-carousel id="carousel-1" :interval="4000" controls>
          <b-carousel-slide
            v-for="(slide, i) in slides"
            :key="i"
            :caption="slide.text"
            :img-src="slide.link"
          />
        </b-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pointers: [
        {
          icon: "https://img.icons8.com/wired/64/000000/budget.png",
          text: "Photography"
        },
        {
          icon:
            "https://img.icons8.com/pastel-glyph/64/000000/customer-support.png",
          text: "Themed Decor"
        },
        {
          icon: "https://img.icons8.com/ios/50/000000/features-list.png",
          text: "Themed Cakes"
        },
        {
          icon: "https://img.icons8.com/wired/64/000000/performance.png",
          text: "Great Venue Options"
        },
        {
          icon:
            "https://img.icons8.com/ios/40/000000/spring-in-motion-filled.png",
          text: "Flexibile packages"
        },
        {
          icon: "https://img.icons8.com/ios/50/000000/add-list.png",
          text: "Dedicated Event Manager"
        }
      ],
      slides: [
        {
          link:
            "https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/67314963_710009899434155_5927996806347620352_n.jpg?_nc_cat=101&_nc_oc=AQkhB4ixjw76528crWAxP5GOCp0LnAqVKZ9Rczu_dT1Wr3bc0G2hDIf__WfeV29s-f4&_nc_ht=scontent.fkhi10-1.fna&oh=093a3771e19d9fea6ae133286da76825&oe=5DAE5583",
          text: "Bridal Shower Package"
        },
        {
          link:
            "https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/66056918_703268590108286_8942237414827491328_o.jpg?_nc_cat=107&_nc_oc=AQlwo2axM_NqqNTw5wB9XCAKMJ_kFHs_zsiUnfKqk3N-4R_jgjCEhhqRBr42isVmFVM&_nc_ht=scontent.fkhi10-1.fna&oh=5a0d0872c835a7038b5acf494497effd&oe=5DAE1D81",
          text: "Bridal Shower"
        },
        {
          link:
            "https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/67158698_712722479162897_763104809623486464_o.jpg?_nc_cat=101&_nc_oc=AQmlkKGxlNfUrHIRqg3GO2f6KUHE9yyUye_eD8MeFPiZDdr7fzb39S_0KQKnS2mZ6o0&_nc_ht=scontent.fkhi10-1.fna&oh=454065e799aa343a7c0649a6e2342485&oe=5DB73AFA",
          text: "Birthday Packages"
        },
        {
          link:
            "https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/61024904_676361386132340_8462816371925843968_o.jpg?_nc_cat=100&_nc_oc=AQkom0nD9UuRYiyKcRgZSjNTY5fW_p-PqFJzHvflLCKViZrUuE8Ikh3ZKQYay78Yrzg&_nc_ht=scontent.fkhi10-1.fna&oh=3c6f7853b8e169ce89eeb804f78e0000&oe=5DB44E95",
          text: "Destination Weddings"
        },
        {
          link:
            "https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/66285209_704483109986834_507711064767463424_o.jpg?_nc_cat=111&_nc_oc=AQlB1B0qhSrXuZ12Y0tBIuZAL05oVn-kk7Ip_-T_lpRUyBCkGNys9K6N7YCSMmmpAag&_nc_ht=scontent.fkhi10-1.fna&oh=01868707696bb3857942d64c516f3571&oe=5DB19579",
          text: "Book your weddings"
        },
        {
          link:
            "https://scontent.fkhi10-1.fna.fbcdn.net/v/t1.0-9/66479096_703840660051079_3676513398608101376_o.jpg?_nc_cat=108&_nc_oc=AQne6MEk3-uyoL9k5r_amuIY4iYJ2GDqgtZmYFq-431JOmvFaeHLQYoQuristNgtq8U&_nc_ht=scontent.fkhi10-1.fna&oh=42af2c9d7216c30555a3c1bbcc69b254&oe=5DAAA5D7",
          text: "Mehndi Decor"
        }
      ]
    };
  }
};
</script>

<style scoped>
.top-heading {
  font-weight: 600;
  font-size: 26px;
}
</style>
