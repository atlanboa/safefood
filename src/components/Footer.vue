<template>
  <footer class="footer">
    <div class="footer_top">
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-md-6 col-lg-3">
            <div class="footer_widget" @click="map_popup_modal()">
              <h3 class="footer_title">address</h3>
              <p class="footer_text">
                경산북도 구미시
                <br />3공단3로 302
              </p>
              <a class="line-button">Get Direction</a>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 col-lg-3">
            <div class="footer_widget">
              <h3 class="footer_title">Reservation</h3>
              <p class="footer_text">
                +10 367 267 2678
                <br />reservation@montana.com
              </p>
            </div>
          </div>
          <div class="col-xl-2 col-md-6 col-lg-2">
            <div class="footer_widget">
              <h3 class="footer_title">Navigation</h3>
              <ul>
                <li>
                  <router-link to="/">Home</router-link>
                </li>
                <li>
                  <router-link to="/foodlist">food</router-link>
                </li>
                <li>
                  <router-link to="/about">About</router-link>
                </li>
                <li>
                  <router-link to="/qna">Q&amp;A</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 col-lg-4">
            <div class="footer_widget">
              <h3 class="footer_title">Naver Search</h3>
              <form action="#" class="newsletter_form" @submit.prevent="NaverSearch()">
                <input type="text" v-model="searchText" placeholder="Search Text...." />
                <!-- <input type="submit" src=""/> -->
                <button id="search_button" type="submit" style="background: url(img/naverSearch.png); background-size:100% 100%;"></button>
                <!-- background-color: rgb(18,202,56) -->
              </form>
              <p class="newsletter_text">Subscribe newsletter to get updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- popup layer -->
    <div class="row">
      <modals-container />
    </div>
  </footer>
</template>
<script>
import MapPopup from "./footer/MapComponentModal.vue";
export default {
  name: "bottom",
  data() {
    return {
      searchText:'',
      address: "경산북도 구미시 3공단3로 302"
    };
  },
  methods: {
    map_popup_modal() {
      this.$modal.show(
        MapPopup,
        {
          text: this.address,
          modal: this.$modal
        },
        {
          name: "map-modal",
          width: "500px",
          height: "500px",
          draggable: true
        }
      );
    },NaverSearch(){
      if(this.searchText==''){
        alert('검색어를 입력하세요');
      }else{
        let url = 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query='+this.searchText;
        window.open(url);
      }
    }
  }
};
</script>

<style>

</style>