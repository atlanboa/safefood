<template>
  <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>Laxaries Rooms</h3>
    </div>
    <!-- bradcam_area_end -->

    <!-- offers_area_start -->
    <div class="offers_area padding_top">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="section_title text-center mb-100">
              <span>Our Offers</span>
              <h3>Ongoing Offers</h3>
            </div>
          </div>
        </div>
        <div class="row">
            <div v-for="(food, index) in foods" :key="index" class="col-xl-4 col-md-4" @click="show_detail(food.code)">
                <div class="single_offers">
                    <div class="about_thumb">
                        <img class="foodimg" :src="food.img"/>
                    </div>
                    <h4>
                    {{food.name}}
                    <br />{{food.maker}}
                    </h4>
                    <div v-html="food.material"></div>
                </div>
                    <a href="#" class="book_now">{{food.name}} 정보</a>
            </div>
        </div>
        
      </div>
    </div>
    <!-- offers_area_end -->

    <!-- features_room_startt -->
    <div class="features_room">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="section_title text-center mb-100">
              <span>Featured Rooms</span>
              <h3>Choose a Better Room</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="rooms_here">
        <div class="single_rooms">
          <div class="room_thumb">
            <img src="img/rooms/1.png" alt />
            <div class="room_heading d-flex justify-content-between align-items-center">
              <div class="room_heading_inner">
                <span>From $250/night</span>
                <h3>Superior Room</h3>
              </div>
              <a href="#" class="line-button">book now</a>
            </div>
          </div>
        </div>
        <div class="single_rooms">
          <div class="room_thumb">
            <img src="img/rooms/2.png" alt />
            <div class="room_heading d-flex justify-content-between align-items-center">
              <div class="room_heading_inner">
                <span>From $250/night</span>
                <h3>Deluxe Room</h3>
              </div>
              <a href="#" class="line-button">book now</a>
            </div>
          </div>
        </div>
        <div class="single_rooms">
          <div class="room_thumb">
            <img src="img/rooms/3.png" alt />
            <div class="room_heading d-flex justify-content-between align-items-center">
              <div class="room_heading_inner">
                <span>From $250/night</span>
                <h3>Signature Room</h3>
              </div>
              <a href="#" class="line-button">book now</a>
            </div>
          </div>
        </div>
        <div class="single_rooms">
          <div class="room_thumb">
            <img src="img/rooms/4.png" alt />
            <div class="room_heading d-flex justify-content-between align-items-center">
              <div class="room_heading_inner">
                <span>From $250/night</span>
                <h3>Couple Room</h3>
              </div>
              <a href="#" class="line-button">book now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- features_room_end -->

    <!-- forQuery_start -->
    <div class="forQuery">
      <div class="container">
        <div class="row">
          <div class="col-xl-10 offset-xl-1 col-md-12">
            <div class="Query_border">
              <div class="row align-items-center justify-content-center">
                <div class="col-xl-6 col-md-6">
                  <div class="Query_text">
                    <p>For Reservation 0r Query?</p>
                  </div>
                </div>
                <div class="col-xl-6 col-md-6">
                  <div class="phone_num">
                    <a href="#" class="mobile_no">+10 576 377 4789</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- forQuery_end-->
  </div>
</template>

<script>
import http from "../../http-common";
export default {
    name:"foodlist",
    data(){
        return{
            foods:[],
            category:"maker",
        }
    },
    mounted(){
        this.initail();
    },
    methods:{
        initail(){
            http
                .get("/api/search/"+this.category)
                .then(response => (this.foods = response.data))
                .catch(() => {this.errored = true;})
                .finally(() => {
                    this.loading = false; 
                });
        },
        show_detail(code){
            this.$router.push("/foodview/"+code);
        }
        
    }

};
</script>

<style lang="scss" scoped>
</style>