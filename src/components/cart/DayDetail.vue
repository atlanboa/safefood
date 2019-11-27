<template>
  <div class="example-modal-content">
        <div class="top_bg_area" style="background-image: url(../img/backgroundfoodimg/JJimlist_top_br.jpg);">
            <div>
                <h3>DayDetail</h3>
            </div>
        </div>
        <div class="d-flex justify-content-center">
        <button class="genric-btn danger" @click="close_Popup">닫기</button>
        </div>
        <br>
        <div class="row">
            <div class="col-7">
                <!-- <button @click="totalFoodInfo">show graph</button> -->
                <!-- <charts :options="chartOptions"></charts> -->
                <Graph :food="userFood"></Graph>
                <!-- <Graph :food="allFood"></Graph> -->
            </div>
            <div class="container col-5" id="jjim_list_table">
                <table class="table table-sm text-center">
                    <tr>
                        <th></th>
                        <th>상품이름</th>
                        <th>상품갯수</th>
                        <th>삭제</th>
                    </tr>
                    <tr v-for="page in pageViewList" :key="page.code">
                        <td><img :src="page.img" style="width:50px; height:50px;"></td>
                        <td>{{page.name}}</td>
                        <td>{{page.count}}</td>
                        <td>
                            <button class="trash_button" @click="delete_intake(page.no)">
                                <i class="fa fa-trash fa-2x"></i> 
                            </button>
                        </td>
                    </tr>
                </table>
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <button class="page-link" aria-label="Previous" @click="pagenation('prev')">
                            <i class="ti-angle-left"></i>
                        </button>
                    </li>
                    <template v-for="page in pagelength">
                        <li class="page-item" :key="page">
                            <button class="page-link" @click="pagenation(page)">{{page}}</button>
                        </li>
                    </template>
                    <li class="page-item">
                        <button class="page-link" aria-label="Next" @click="pagenation('next')">
                            <i class="ti-angle-right"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    
    <!-- {{this.data}}
    {{this.userintake}} -->
  </div>
  
</template>

<script>
import Graph from "../foodservice/Graph.vue";
import http from "../../http-common";
export default {
  props: ["data"],
  components:{ Graph },
  mounted() {
    this.start();
  },
  data() {
    return {
      pageViewList:[],
      pagelength:0,
      pagechoose:1,
      userintake: [],
      userFood:{
        supportpereat:0,
        calory:0,
        carbo:0,
        protein:0,
        fat:0,
        sugar:0,
        natrium:0,
        chole:0,
        fattyacid:0,
        transfat:0,
      }
      /*
	private int no;
	private String id;
	private int code;
	private String img;
	private int count;
	protected double supportpereat;
	protected double calory
	protected double carbo;
	protected double protein;
	protected double fat;
	protected double sugar;
	protected double natrium;
	protected double chole	
	protected double fattyacid;
	protected double transfat;
	private String time;
      */
    };
  },
  methods: {
    start(){
        //mounted 될때 비동기로 props로 받아온 data
      // data.userid, data.date 로 사용하면 된다.
      window.console.log(this.data);
      this.userintake=[];
      this.userFood={
        supportpereat:0,
        calory:0,
        carbo:0,
        protein:0,
        fat:0,
        sugar:0,
        natrium:0,
        chole:0,
        fattyacid:0,
        transfat:0,
      };
      this.pagechoose=1;
      http
        .post("/api/daydetail", {
          id: this.data.userid,
          time: this.data.date
        })
        .then(response => {
          this.userintake = response.data;
          
          window.console.log("response.data :::::::: "+response.data);
          for (var userin in this.userintake) {
            this.userintake[userin].name = this.userintake[userin].img.substring(4,this.userintake[userin].img.length-4);
            this.userFood.supportpereat+=this.userintake[userin].supportpereat;
            this.userFood.calory+=this.userintake[userin].calory;
            this.userFood.carbo+=this.userintake[userin].carbo;
            this.userFood.protein+=this.userintake[userin].protein;
            this.userFood.fat+=this.userintake[userin].fat;
            this.userFood.sugar+=this.userintake[userin].sugar;
            this.userFood.natrium+=this.userintake[userin].natrium;
            this.userFood.natrium+=this.userintake[userin].natrium;
            this.userFood.chole+=this.userintake[userin].chole;
            this.userFood.fattyacid+=this.userintake[userin].fattyacid;
            this.userFood.transfat+=this.userintake[userin].transfat;
          }
          
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
          this.$EventBus.$emit('update_graph_value');
          this.pagelength = parseInt(this.userintake.length/5);
          if(this.userintake.length%5>0) this.pagelength++;
          window.console.log("pagelength :::::::: "+this.pagelength);
          this.pagenation(1);
        });
        // window.console.log("userintake :::::::: "+this.userintake.length);
        // this.pagelength = parseInt(this.userintake.length/5);
        // if(this.foods.length%5>0) this.pagelength++;
        // window.console.log("pagelength :::::::: "+this.pagelength);
        // 
        // this.pagenation(1);
        
        // alert(JSON.stringify(this.userFood));

    },
    pagenation(page){
        if(page==='prev') page=this.pagechoose-1;
        if(page==='next') page=this.pagechoose+1;
        if(page<1) {
            page=1;
            //alert('첫 페이지 입니다.');
        }
        if(page>this.pagelength){
            page=this.pagelength-1;
            //alert('끝 페이지 입니다.');
        }
        this.pagechoose=page;
        this.pageViewList=[];
        for (let index = (this.pagechoose-1)*5; index < (this.pagechoose-1)*5+5; index++) {
            if(index<this.userintake.length)
                this.pageViewList.push(this.userintake[index]);
        }
    },
    close_Popup() {
      this.$emit("close");
    },delete_intake(no){
       http
        .post("/api/daydetail/delete", {
          no: no,
        })
        .then(response => {
          this.userintake = response.data;
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.start();
        });
    }
  }
};
</script>
<style>
    .top_bg_area{
        padding: 60px;
        background-size: cover;
        background-position: center center;
        text-align: center;
        padding: 30px 0 30px 0;
    }
    h3{
        font-size: 45px;
        color: #fff;
        font-weight: 400;
        margin-bottom: 0;
        text-transform: capitalize;
    }
    #jjim_list_table{
        height: 10px;
    }
    .trash_button{
        background:white;
        border:0;
    }

</style>