<template>
  <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>니 몇일에 머 무겄농?</h3>
    </div>
    <v-calendar
      is-expanded
      ref="calendar"
      :max-date="new Date()"
      :attributes="attrs"
      @dayclick="click()"
    />

    <!-- popup layer -->
    <div class="row">
      <modals-container />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VCalendar from "v-calendar";

Vue.use(VCalendar, {
  // componentPrefix: "vc" // Use <vc-calendar /> instead of <v-calendar />
});
import DayDetail from "./DayDetail.vue";
export default {
  name: "cart",
  data() {
    return {
      attrs: [
        {
          key: "today",
          highlight: "red",
          dates: new Date()
        }
      ]
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

      var data = {
        date : convertedDate,
        //userid는 페이지 넘어가서도 아마 받을수 있을꺼니깐 안넘겨도 될듯
        userid : this.$session.get("jwt").id,
      };

      this.$modal.show(
        DayDetail,
        {
          text: data,
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