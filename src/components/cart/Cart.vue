<template>
  <div>
    <div class="bradcam_area" style="background-image: url(../img/backgroundfoodimg/cart_top_bg_2.jpg);">
      <div>
        <img src="img/whatdidyoueat.png" alt srcset />
      </div>
    </div>
    <br>
    <br>
    <div  class="container">
      <h1 class="text-center"> Calender </h1>
      <div>
        <v-calendar
          is-expanded
          ref="calendar"
          :max-date="new Date()"
          :attributes="attrs"
          is-dark
          @dayclick="click()"
        />
      </div>
      <br>
      <h2 class="text-center">가장 많이 먹는 시간</h2>
      <div id="clock">
        <p class="time d-flex justify-content-center">{{this.maxIntakeTime}}{{clockbar}}00{{clockbar}}00</p>
      </div>
      <br><br>
      <div>
        <h1 class="text-center">{{nowMonth}} 그래프</h1>
        <Graph :food="total"></Graph>
      </div>
      <div>
        <h1 class="text-center">이번달에는 {{max.name}} ({{max.count}}개) 를 가장 많이 먹었습니다!</h1>
      </div>
    </div>
    <!-- popup layer -->
    <div class="row">
      <modals-container />
    </div>

    
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import Vue from "vue";
import VCalendar from "v-calendar";
import http from "../../http-common";
import Graph from "../foodservice/Graph.vue";

Vue.use(VCalendar, {
  // componentPrefix: "vc" // Use <vc-calendar /> instead of <v-calendar />
});
import DayDetail from "./DayDetail.vue";
export default {
  name: "cart",
  components:{
    Graph
  },
  mounted() {
    http
      .get("/api/cart/" + this.$session.get("jwt").id)
      // .get("/api/cart/"+"ssafy")
      .then(response => {
        this.maxIntakeTime = response.data;
      })
      .catch(() => {
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });
    const today = new Date();
    this.nowMonth = today.getFullYear()+"-"+(today.getMonth()+1);//+"-"+today.getDate()+" "
      //+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    this.month_chart();
  },
  data() {
    return {
      nowMonth:'',
      user_month_foods:[],
      total:{
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
      },
      max:{
        name:'',
        count:0
      },

      clockbar:':',
      attrs: [
        {
          date: '',
          key: "today",
          highlight: "red",
          dates: new Date()
        }
      ],
      // intakes : [],
      maxIntakeTime: null
    };
  },
  methods: {
    click() {
      /*
        일자 클릭되면 도는 메소드
        convertedDate YYYY-MM-DD 로 변환된 데이터

      */
      const calendar = this.$refs.calendar;

      var date =
        calendar._data.pages[0].key + "-" + calendar._data.focusableDay;
      // var convertedDate = this.date_to_str(date);

      window.console.log(calendar);
      window.console.log(date);
      var data = {
        date: date,
        //userid는 페이지 넘어가서도 아마 받을수 있을꺼니깐 안넘겨도 될듯
        userid: this.$session.get("jwt").id
      };

      this.$modal.show(
        DayDetail,
        {
          data: data,
          modal: this.$modal
        },
        {
          name: "dynamic-modal",
          width: "90%",
          height: "90%",
          draggable: true
        }
      );
    },
    date_to_str(format) {
      var year = format.getFullYear();
      var month = format.getMonth() + 1;
      if (month < 10) month = "0" + month;
      var date = format.getDate();
      if (date < 10) date = "0" + date;
      var hour = format.getHours();
      if (hour < 10) hour = "0" + hour;
      var min = format.getMinutes();
      if (min < 10) min = "0" + min;
      var sec = format.getSeconds();
      if (sec) sec = "0" + sec;
      return year + "-" + month + "-" + date;
    },todo(){
        this.intervalid1 = setInterval(function(){
          this.clockbar=':'
        }, 1000);
    },month_chart(){
      this.total={
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
      };
      this.max={
        name:'',
        count:0
      };
      let user_month_foods = [];
      http
        .post("/api/daydetail", {
          id: this.$session.get("jwt").id,
          time: this.nowMonth
        })
        .then(response => {
          user_month_foods = response.data;
          window.console.log("response.data :::::::: "+JSON.stringify(response.data));
          for (var num in user_month_foods) {
            if(this.max.count < user_month_foods[num].count){
              this.max.name = user_month_foods[num].img.substring(4,user_month_foods[num].img.length-4);
              this.max.count = user_month_foods[num].count;
            }

            this.total.supportpereat+=user_month_foods[num].supportpereat;
            this.total.calory+=user_month_foods[num].calory;
            this.total.carbo+=user_month_foods[num].carbo;
            this.total.protein+=user_month_foods[num].protein;
            this.total.fat+=user_month_foods[num].fat;
            this.total.sugar+=user_month_foods[num].sugar;
            this.total.natrium+=user_month_foods[num].natrium;
            this.total.natrium+=user_month_foods[num].natrium;
            this.total.chole+=user_month_foods[num].chole;
            this.total.fattyacid+=user_month_foods[num].fattyacid;
            this.total.transfat+=user_month_foods[num].transfat;
          }
          window.console.log("response.data :::::::: "+JSON.stringify(this.total));
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.$EventBus.$emit('update_graph_value');
        });
    }
  }
};
</script>

<style lang="scss">
.time {
        font-family: 'Share Tech Mono', monospace;
        color: #000000;
        text-align: center;
        letter-spacing: 0.05em;
        font-size: 80px;
        padding: 5px 0;
    }
    #clock{
      background: #0f3854;
      background: radial-gradient(ellipse at center,  #b2ecfc  0%, #ffffff 70%);
      background-size: 100%;
    }
</style>