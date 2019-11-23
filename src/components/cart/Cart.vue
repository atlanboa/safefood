<template>
  <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>니 몇일에 머 무겄농?</h3>
    </div>
    <vc-calendar
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
  componentPrefix: "vc" // Use <vc-calendar /> instead of <v-calendar />
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
      const calendar = this.$refs.calendar;

      var date = calendar._data.store.list[0].dates[0].date;
      var convertedDate = this.date_to_str(date);

      window.console.log(convertedDate);

      var data = null;
      if (name === "jeon") {
        data = this.$data.jeon_info;
      } else {
        data = this.$data.kim_info;
      }
      window.console.log(data);
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