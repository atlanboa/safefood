<template>
  <div id="content">
    <SideVar></SideVar>

    <div class="bradcam_area" style="background-image: url(../img/backgroundfoodimg/foodlist_top_bg_1.jpg);">
      <div>
        <img src="img/seewhatyouwant.png" alt="" srcset="">
      </div>
    </div>
    <!-- bradcam_area_end -->

    <!-- <div>
      <div class="row">
        <div class="col-3">
          <h3>Draggable 1</h3>
          <draggable
            class="dragArea list-group"
            :list="list1"
            :group="{ name: 'people', pull: 'foodlist', put: false }"
            @change="log"
          >
            <div
              class="list-group-item"
              v-for="element in list1"
              :key="element.name"
            >{{ element.name }}</div>
          </draggable>
        </div>

        <div class="col-3">
          <h3>Draggable 2</h3>
          <draggable class="dragArea list-group" :list="list2" group="people" @change="log">
            <div
              class="list-group-item"
              v-for="element in list2"
              :key="element.name"
            >{{ element.name }}</div>
          </draggable>
        </div>

        <rawDisplayer class="col-3" :value="list1" title="List 1" />

        <rawDisplayer class="col-3" :value="list2" title="List 2" />
      </div>
    </div> -->
    <!-- offers_area_start -->
    <div class="offers_area padding_top">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="section_title text-center mb-100">
              <h3>FoodList</h3>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <select v-model="category" class="selectpicker">
                    <option value="name">상품명</option>
                    <option value="maker">제조사</option>
                    <option value="material">원재료</option>
                  </select>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search......"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  v-model="searchText"
                  @keyup.enter="search"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" @click="search" type="button">검색</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div v-for="(food, index) in foods" :key="index" class="col-xl-3 col-md-3">
            <div class="single_offers item_information" @click="show_detail(food.code)">
              <div class="about_thumb">
                <img class="foodimg" :src="food.img" />
              </div>
              <h4 class="item_title">
                {{food.name}}
              </h4>
              <h4 class="item_maker">
                {{food.maker}}
              </h4>
            </div>
            <AddIngestion :food="food" :update="localstorageAdd" :componentKey="componentKey"></AddIngestion>
          </div>
        </div>
      </div>
    </div>
    <!-- offers_area_end -->
  </div>
</template>

<script>
import SideVar from "./SideVar.vue";
import AddIngestion from "./AddIngestion.vue";
import http from "../../http-common";
// import draggable from "vuedraggable";
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
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    };
  },
  components: {
    AddIngestion,
    SideVar,
    // draggable
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

</style>