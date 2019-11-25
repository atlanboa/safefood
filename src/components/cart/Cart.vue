<template>
  <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>니 몇일에 머 무겄농?</h3>
    </div>
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
      <h2>분석 사항</h2>
      <h1>가장 많이 먹는 시간대는 말이져 : {{this.maxIntakeTime}}</h1>
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
      .then(response => {
        this.intakes = response.data;
        this.timeTable = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ];

        window.console.log(" 나와야 합니다 :  " + this.intakes);
        //사용자 섭취 알고리즘 파트
        this.intakes.forEach(function(intake) {
          window.console.log(" 나와야 합니다 :  " + intake.time);

          this
            .timeTable[(intake.time - 2 < 0 ? (intake.time - 2) * -1 : intake.time - 2) % 24]++;
          this
            .timeTable[(intake.time - 1 < 0 ? (intake.time - 1) * -1 : intake.time - 1) % 24]++;
          this.timeTable[intake.time % 24]++;
          this.timeTable[(intake.time + 1) % 24]++;
          this.timeTable[(intake.time + 2) % 24]++;
        }); //forEach

        var maxInx = 0;

        this.timeTable.forEach(function(table, index) {
          window.console.log(table+" "+index)
          if (this.timeTable[maxInx] < table) {
            maxInx = index;
          }
        }); //timeTable forEach

        this.maxIntakeTime = maxInx;
        window.console.log("니가 많이 처먹는 시간은 : " + this.maxIntakeTime);
      })
      .catch(() => {
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });
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
      intakes: [],
      timeTable: [],
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

      var date = calendar._data.store.list[0].dates[0].date;
      var convertedDate = this.date_to_str(date);

      window.console.log(convertedDate);
      window.console.log(this.$session.get("jwt").id);

      var data = {
        date: convertedDate,
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
          width: "500px",
          height: "280px",
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