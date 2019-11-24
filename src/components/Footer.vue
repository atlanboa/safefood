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
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Rooms</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 col-lg-4">
            <div class="footer_widget">
              <h3 class="footer_title">Newsletter</h3>
              <form action="#" class="newsletter_form">
                <input type="text" placeholder="Enter your mail" />
                <button type="submit">Sign Up</button>
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
    }
  }
};
</script>

<style>
</style>