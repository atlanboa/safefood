<template>
  <div id="content">
    <SideVar></SideVar>

    <div class="bradcam_area" style="filter:grayscale(50%); background-image: url(../img/backgroundfoodimg/foodlist_top_bg_1.jpg);">
      <div>
        <img src="img/seewhatyouwant.png" alt="" srcset="">
      </div>
    </div>
    <!-- bradcam_area_end -->


    <!-- offers_area_start -->
    <div class="offers_area padding_top">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="section_title text-center mb-100">
              <img src="img/foodlist.png" alt="">
              <br>
              <br>
              <br>
              <div class="input-group mb-3 d-flex flex-column ">
                <div class="input-group-prepend d-flex justify-content-center">
                  <select v-model="category" class="selectpicker">
                    <option value="name">상품명</option>
                    <option value="maker">제조사</option>
                    <option value="material">원재료</option>
                  </select>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search......"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    v-model="searchText"
                    @keyup.enter="search"
                    style="max-width:50%;"
                  />
                  <button class="btn btn-outline-secondary" @click="search" type="button">검색</button>
                </div>
              </div>
            </div>
          </div>
        </div>
            <!-- draggable -->
    <div class="container">
        <h3>Draggable 1</h3>
        <draggable class="dragArea row" :list="foods" :group="{ name: 'people', pull: 'clone', put: false }" @change="log">
          <div class="col-xl-3 col-md-3 hanna-font" v-for="element in foods" :key="element.code">
            <!-- {{ element.name }} -->
            <div class="single_offers item_information" @click="show_detail(element.code)">
                <div class="about_thumb">
                  <img class="foodimg" :src="element.img" style="width:100%; height:100%"/>
                </div>
                <h4 class="item_title hanna-font">
                  {{element.name}}
                </h4>
                <h6 class="item_maker" style="font-size:12px;">
                  {{element.maker}}
                </h6>
              </div>
              <AddIngestion :food="element"></AddIngestion>
          </div>
      </draggable>
    

      <div>
        <h3>Draggable 2</h3>
        <draggable id="leftside"
          class="dragArea"
          :list="localstorageList"
          group="people"
          @change="localstorageinsert"
        >
          <div
            
            v-for="element in localstorageList"
            :key="element.code"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
      <rawDisplayer class="col-12" :value="foods" title="List 1" />
      <rawDisplayer :value="localstorageList" title="List 2" />
    </div>
    <!-- end draggable -->
        <!-- <div class="row">
          <div v-for="(food, index) in foods" :key="index" class="col-xl-3 col-md-3">
            <div class="single_offers item_information" @click="show_detail(food.code)">
              <div class="about_thumb">
                <img class="foodimg" :src="food.img" />
              </div>
              <h4 class="item_title">
                {{food.name}}
              </h4>
              <h6 class="item_maker" style="font-size:12px;">
                {{food.maker}}
              </h6>
            </div>
            <AddIngestion :food="food"></AddIngestion>
          </div>
        </div> -->
      </div>
    </div>
    <!-- offers_area_end -->
  </div>
</template>

<script>
import SideVar from "./SideVar.vue";
import AddIngestion from "./AddIngestion.vue";
import http from "../../http-common";
import draggable from "vuedraggable";
export default {
  name: "foodlist",
  display: "Clone",
  order: 2,
  data() {
    return {
      componentKey:0,
      searchText:'',
      food: {},
      foods: [],
      category: "name",
      localstorageList: [
        
      ]
    };
  },
  components: {
    AddIngestion,
    SideVar,
    draggable
  },
  mounted() {
    this.initail();
  },
  methods: {
    initail() {
      http
        .get("/api/search/" + this.category)
        .then(response => (this.foods = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    show_detail(code) {
      this.$router.push("/foodview/" + code);
    },
    log: function(evt) {
      
      window.console.log(evt);
    },localstorageinsert(evt){
      let inputFood = evt.added.element;
      if(inputFood.quantity==null||inputFood.quantityL<1){
        alert("찜갯수를 정하지 않았습니다.")
      }else{
        let localValue = localStorage.getItem(inputFood.code);
        if(localValue){
        let localValueToJson = JSON.parse(localValue);
        inputFood.quantity = Number(inputFood.quantity) + Number(localValueToJson.quantity);
        }
        localStorage.setItem(
        inputFood.code,
        JSON.stringify(inputFood)
        );
        this.food.quantity=0;
      }
      this.$EventBus.$emit('click-icon')
      window.console.log(evt);
      this.localstorageList=[];
    },
    search(){
      if(this.searchText==""){
          this.initail();
      }else{
       http
       .get("api/search/"+this.category+"/"+this.searchText)
       .then(response => {this.foods = response.data})
       .catch(() => {this.errored = true;})
       .finally(() => {this.loading = false; window.console.log(this.foods);
       });
      }
    },
    localstorageAdd(){
      this.componentKey++;
    },updateJJim(code){
      alert("여기당"+code);
    }
  }
};
</script>

<style lang="scss" scoped>
#content {
  
  position: relative;
}
.item_title{
  text-align: center;
}
.item_maker{
  text-align: center;
}
.item_information{
  cursor: pointer;
}
.item_information:hover{
  opacity: 0.5;
}
#leftside {
    color:transparent;
    position:fixed;
    top:0px;
    left:0px;
    background-color:transparent;
    height: 300%;
    width: 200px;
    font-size: 1em;
    z-index: 0;
    border: 0px solid transparent;
  }
#leftside * {
  color:transparent;
  background-color:transparent;
  border: 0;
  outline:0;
  width: 0;
  height: 0;
}

.hanna-font{
  font-family:'HangeulNuri-Bold';
}
</style>