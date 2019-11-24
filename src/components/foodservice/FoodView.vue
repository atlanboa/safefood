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
              <span v-for="(item, index) in allergin" :key="index">{{item}}</span>
              <br />
              <a href="#" class="line-button">Learn More</a>
            </div>
          </div>
        </div>
      </div>
      <!-- about_area_end -->
      
      <Cal></Cal>
<!-- 그래프 정보 -->
      <charts :options="chartOptions"></charts>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
import Vue from "vue";
import HighchartsVue from "highcharts-vue";
import Cal from './Cal.vue'
Vue.use(HighchartsVue, { tagName: "charts" });
Cal
export default {
  name: "foodview",
  props: ["code"],
  components:{ Cal},
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
      chartOptions: {
        chart: {
          type: "pie"
        },
        title: {
          text: "Nutrition Information"
        },
        series: 
          {
            name:'양',
            colorByPoint:true,
            data: [
                


            ],
            color: "#6fcd98"
          }
        
      }




    };
  },
  mounted() {
    // alert(JSON.stringify(this.food))
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
        this.chartOptions.series.data=[
        {
          name:'칼로리',
          y:this.food.calory,
          },
          {
          name:'탄수화물',
          y:this.food.carbo,
          },
          {
          name:'단백질',
          y:this.food.protein,
          },
          {
          name:'지방',
          y:this.food.fat,
          },
          {
          name:'당류',
          y:this.food.sugar,
          },
          {
          name:'나트륨',
          y:this.food.natrium,
          },
          {
          name:'콜레스테롤',
          y:this.food.chole,
          },
          {
          name:'포화지방산',
          y:this.food.fattyacid,
          },
          {
          name:'트렌스지방',
          y:this.food.transfat,
          },

      ]
      });
      

  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
</style>