<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="img/banner/banner.png" alt="First slide" />
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="img/banner/banner2.png" alt="Second slide" />
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="img/banner/banner.png" alt="Third slide" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <!-- <div class="slider_area">
      <div class="slider_active owl-carousel">
        <div class="single_slider d-flex align-items-center justify-content-center slider_bg_1">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="slider_text text-center">
                  <h3>Montana Resort</h3>
                  <p>Unlock to enjoy the view of Martine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="single_slider d-flex align-items-center justify-content-center slider_bg_2">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="slider_text text-center">
                  <h3>Life is Beautiful</h3>
                  <p>Unlock to enjoy the view of Martine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="single_slider d-flex align-items-center justify-content-center slider_bg_1">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="slider_text text-center">
                  <h3>Montana Resort</h3>
                  <p>Unlock to enjoy the view of Martine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="single_slider d-flex align-items-center justify-content-center slider_bg_2">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="slider_text text-center">
                  <h3>Life is Beautiful</h3>
                  <p>Unlock to enjoy the view of Martine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <div class="gcse-search"></div>
    <div class="about_area">
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-5">
            <div class="about_info">
              <div class="section_title mb-20px">
                <span>About Us</span>
                <h3>
                  오늘의 추천 음식
                  <br />with Nature
                </h3>
              </div>
              <p>
                {{food1.name}}
                <br />
                {{food2.name}}
                <br />Suscipit libero pretium nullam potenti. Interdum, blandit phasellus consectetuer dolor ornare
                dapibus enim ut tincidunt rhoncus tellus sollicitudin pede nam maecenas, dolor sem. Neque
                sollicitudin enim. Dapibus lorem feugiat facilisi faucibus et. Rhoncus.
              </p>
              <button class="line-button main-to-list-button" @click="goFoodList">go food List</button>
            </div>
          </div>
          <div class="col-xl-7 col-lg-7">
            <div class="about_thumb d-flex">
              <div class="img_1" @click="goFood(food1.code)">
                <img class="main_page_images" :src="food1.img" alt />
              </div>
              <div class="img_2" @click="goFood(food2.code)">
                <img class="main_page_images" :src="food2.img" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- about_area_end -->
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "mainpage",
  data() {
    return {
      food1: {
        code: 0,
        name: null,
        material: null,
        supportpereat: 0,
        calory: 0,
        carbo: 0,
        protein: 0,
        fat: 0,
        sugar: 0,
        natrium: 0,
        chole: 0,
        fattyacid: 0,
        transfat: 0,
        img: null,
        quantity: 0
      },
      food2: {
        code: 0,
        name: null,
        material: null,
        supportpereat: 0,
        calory: 0,
        carbo: 0,
        protein: 0,
        fat: 0,
        sugar: 0,
        natrium: 0,
        chole: 0,
        fattyacid: 0,
        transfat: 0,
        img: null,
        quantity: 0
      }
    };
  },
  mounted() {
    http
      .get("api/selectByFoodCode/" + 1)
      .then(response => {
        this.food1 = response.data;
        window.console.log(this.food1);
      })
      .catch(() => {
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });
    http
      .get("api/selectByFoodCode/" + 2)
      .then(response => {
        this.food2 = response.data;
        window.console.log(this.food2);
      })
      .catch(() => {
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    goFood(code) {
      this.$router.push("/foodview/" + code);
    },
    goFoodList() {
      this.$router.push("/foodlist");
    }
  }
};
</script>

<style>
.main_page_images {
  width: 284px;
  height: 284px;
}
.main-to-list-button {
  background-color: white;
  border: 0;
  outline: 0;
}
</style>