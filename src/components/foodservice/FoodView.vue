<template>
  <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>Food Information View</h3>
    </div>
    <!-- about_area_start -->
    <div class="about_area">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-7">
            <div class="about_thumb2 d-flex">
              <div class="img_1">
                <img class="foodimg" :src="'../'+food.img" alt />
              </div>
            </div>
          </div>
          <div class="col-xl-5 col-lg-5">
            <div class="about_info">
              <div class="section_title mb-20px">
                <span>Delicious Food</span>
                <h3>
                  {{food.name}}
                  <br />
                  {{food.maker}}
                </h3>
              </div>
              <p>{{food.material}}</p>
              <span>알러지정보 :</span>
              <span v-for="(item, index) in allergin" :key="index">{{item+" "}}</span>
              <br />
              <AddIngestion :food="this.food"></AddIngestion>
              <a href="#" class="line-button">Learn More</a>
            </div>
          </div>
        </div>
      </div>
      <!-- about_area_end -->
      
      <!-- 그래프 정보 -->
      <!-- <charts :options="chartOptions"></charts> -->
      <Graph :food="this.food" :title="this.food.name"></Graph>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
import AddIngestion from "./AddIngestion.vue";
import Graph from "./Graph.vue"

export default {
  name: "foodview",
  props: ["code"],
  components:{ AddIngestion, Graph},
  data() {
    return {
      food: {
          code:0,
          name:null,
          material:null,
          supportpereat:0,
          calory:0,
          carbo:0,
          protein:0,
          fat:0,
          sugar:0,
          natrium:0,
          chole:0,
          fattyacid:0,
          transfat:0,
          img:null,
          quantity:0
      },
      loading: true,
      errored: false,
      comment: null,
      allergies: ["대두","땅콩","우유","게","새우","참치","연어","쑥","소고기","닭고기","돼지고기","복숭아","민들레","계란흰자"],
      allergin:[],

///////////////////////////
      title: "Nutrition Information",
      chartType: "pie",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,

    };
  },
  created() {
    http
      .get("api/selectByFoodCode/" + this.code)
      .then(response => {
        this.food = response.data;
        window.console.log(this.food);
      })
      .catch(() => {
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
        for (let j = 0; j < this.allergies.length; j++) {
          if (this.food.material.indexOf(this.allergies[j]) > -1) {
            // alert(JSON.stringify(this.allergin[j]))
            this.allergin.push(this.allergies[j]);
          }
        }
        if(this.allergin.length==0)this.allergin.push('알러지 없음');
        this.$EventBus.$emit('update_graph_value');
      });
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
</style>