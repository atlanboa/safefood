<template>
  <div>
    <div class="bradcam_area breadcam_bg_1">
      <div>
        <img src="img/whatdidyoueat.png" alt srcset />
      </div>
    </div>
    <br />
    <br />
    <div class="container">
      <h1 class="text-center">Calender</h1>
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
      <div>
        <br>
        <h1 class="text-center">당신이 가장 많이 먹는 시간대는 : {{this.maxIntakeTime}}시</h1>
        <br>
      </div>
    </div>
    <!-- popup layer -->
    <div class="row">
      <modals-container />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VCalendar from "v-calendar";
import http from "../../http-common";

Vue.use(VCalendar, {
  // componentPrefix: "vc" // Use <vc-calendar /> instead of <v-calendar />
});
import DayDetail from "./DayDetail.vue";
export default {
  name: "cart",
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

      window.console.log(new Date())

    // http
    //   .get("/api/cart2/" + this.$session.get("jwt").id)
    //   // .get("/api/cart/"+"ssafy")
    //   .then(response => {
    //     this.intakes = response.data;

    //     this.intakes.forEach(function(intake){
    //       this.attrs.push({
    //         key : intake.time,
    //         highlight : "blue",
    //         dates : 
    //       })
    //     })

    //   })
    //   .catch(() => {
    //     this.errored = true;
    //   })
    //   .finally(() => {
    //     this.loading = false;
    //   });
  },
  data() {
    return {
      attrs: [
        {
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
    }
  }
};
</script>

<style>
</style>