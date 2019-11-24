<template>
    <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-date-picker @dayclick="click()" v-model="selectedDate" color="green lighten-1"></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue'
import VCalendar from 'v-calendar'
// import 'v-calendar/lib/v-calendar.min.css'
Vue.use(VCalendar);
export default {
  name: "Cal",
  data() {
    return {
      selectedDate: null,
      themeStyles: {
        wrapper: {
          border: '1',
        },
        header: {
          color: '#fafafa',
          backgroundColor: '#f142f4',
          borderColor: '#404c59',
          borderWidth: '1px 1px 0 1px',
        },
        headerVerticalDivider: {
          borderLeft: '1px solid #404c59',
        },
        weekdays: {
          color: '#ffffff',
          backgroundColor: '#f142f4',
          borderColor: '#ff0098',
          borderWidth: '0 1px',
          padding: '5px 0 10px 0',
        },
        weekdaysVerticalDivider: {
          borderLeft: '1px solid #404c59',
        },
        weeks: {
          border: '1px solid #dadada',
        },
      },
    };
  },methods:{
    click(){
      alert(this.selectedDate);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>