<template>
  <div>
    <div class="bradcam_area" style="background-image: url(../img/backgroundfoodimg/about_top_bg.jpg);">
      <img src="img/about.png" alt="" srcset="">
    </div>
    <!-- <div class="slider_area">
      <div class="slider_active owl-carousel">
        <div class="single_slider d-flex align-items-center justify-content-center slider_bg_1">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="slider_text text-center">
                  <h3>Montana Resort</h3>
                  <p>Unlock to enjoy the view of Martine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="single_slider d-flex align-items-center justify-content-center slider_bg_2">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="slider_text text-center">
                  <h3>Life is Beautiful</h3>
                  <p>Unlock to enjoy the view of Martine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="single_slider d-flex align-items-center justify-content-center slider_bg_1">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="slider_text text-center">
                  <h3>Montana Resort</h3>
                  <p>Unlock to enjoy the view of Martine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="single_slider d-flex align-items-center justify-content-center slider_bg_2">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="slider_text text-center">
                  <h3>Life is Beautiful</h3>
                  <p>Unlock to enjoy the view of Martine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->

    <div class="about_area">
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-5">
            <div class="about_info">
              <div class="section_title mb-20px">
                <span>About Us</span>
                <h3>
                  SSAFY Web Project
                  <br />JaeWook Jeon, Sangheon Kim
                </h3>
              </div>
              <p>
                This page is an ultimate project for six month with So many Solutions likes Spring Boot, Spring Maven, RestController,
                Single Page Application, Vue.js, javascript.
              </p>
            </div>
          </div>
          <div class="col-xl-7 col-lg-7">
            <div class="about_thumb d-flex">
              <div class="img_1">
                <img
                  id="jeon"
                  @click="doc_popup_modal('jeon')"
                  src="img/programmer/JaeWook Jeon.jpg"
                  alt
                />
              </div>
              <div class="img_2">
                <img
                  id="kim"
                  @click="doc_popup_modal('kim')"
                  src="img/programmer/Sangheon Kim.jpg"
                  alt
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- about_area_end -->

    <!-- popup layer -->
    <div class="row">
      <modals-container />
    </div>
  </div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script>
import DelPopup from "./CustomComponentModal.vue";
export default {
  name: "about",
  data() {
    return {
      jeon_info: {
        name: "전재욱",
        age: "28",
        main_language: "Java, JavaScript, C++, C",
        sw_level: "A",
        from: "경산시 중산동",
        hobby: "Playing a Game, Watching a Movie"
      },
      kim_info: {
        name: "김상헌",
        age: "28",
        main_language: "Java, JavaScript, C++, C",
        sw_level: "A",
        from: "대구시 서구 상리동",
        hobby: "Playing a Game, Watching a Movie"
      }
    };
  },
  methods: {
    doc_popup_modal(name) {
      window.console.log("이름 : " + name);
      var data = null;
      if (name === "jeon") {
        data = this.$data.jeon_info;
      } else {
        data = this.$data.kim_info;
      }
      window.console.log(data);
      this.$modal.show(
        DelPopup,
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
    }
  }
};
</script>

<style lang="scss" scoped>
.imgSelect {
  cursor: pointer;
}

.popupLayer {
  position: absolute;
  display: none;
  background-color: #ffffff;
  border: solid 2px #d0d0d0;
  width: 350px;
  height: 150px;
  padding: 10px;
}
.popupLayer div {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>