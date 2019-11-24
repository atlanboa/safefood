<template>
  <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>Laxaries Rooms</h3>
    </div>
    <VCalendar/>
    <h2>캘린더페이지</h2>
  </div>
</template>

<script>
import Vue from 'vue';
import VCalendar from 'v-calendar';
import { setupCalendar} from 'v-calendar'

Vue.component('calendar', VCalendar)



setupCalendar({
  componentPrefix: 'vc',

});
export default {
  name : 'calendar',
  components : {
    VCalendar
  }
  
}
</script>

<style>

</style>