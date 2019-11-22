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
                    <div v-html="materialslice(food.material)"></div>
                </div>
                    <a href="#" class="book_now">{{food.name}} 정보</a>
            </div>
        </div>
        
      </div>
    </div>
    <!-- offers_area_end -->

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
        },materialslice(material){
          return material.substr(0,100)+"...";
        }
        
    }

};
</script>

<style lang="scss" scoped>
</style>