<template>
    <div class="example-modal-content d-flex flex-column" >
        <div class="top_bg_area" style="background-image: url(../img/backgroundfoodimg/JJimlist_top_br.jpg);">
            <div>
                <h3>JJim List</h3>
            </div>
        </div>
        <div class="d-flex justify-content-center">
        <button class="genric-btn danger" @click="close_Popup">닫기</button>
        <button class="genric-btn danger" @click="JJim_to_Cart">섭취 식품으로 등록</button>
        <button class="genric-btn danger" @click="myIngestionInfo">내정보로 이동</button>
        </div>
        <br>
        <div class="row">
            <div class="col-7">
                <!-- <button @click="totalFoodInfo">show graph</button> -->
                <!-- <charts :options="chartOptions"></charts> -->
                <Graph :food="allFood"></Graph>
            </div>
            <div class="container col-5" id="jjim_list_table">
                <table class="table table-sm text-center">
                    <tr>
                        <th></th>
                        <th>상품이름</th>
                        <th>상품갯수</th>
                        <th>삭제</th>
                    </tr>
                    <tr v-for="view in pageViewList" :key="view">
                        <td><img :src="view.img" style="width:50px; height:50px;"></td>
                        <td>{{view.name}}</td>
                        <td>{{view.quantity}}</td>
                        <td>
                            <button class="trash_button" @click="delete_JJim(view.code)">
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
                    <template v-for="view in pagelength">
                        <li class="page-item" :key="view">
                            <button class="page-link" @click="pagenation(view)">{{view}}</button>
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
        <div class="stackedgraph container">
            <StackedGraph :foods="foods"></StackedGraph>
        </div>
        
    </div>
</template>

<script>
import http from "../../http-common";
import Graph from "./Graph.vue";
import StackedGraph from "./StackedGraph.vue"
    export default {
        props: ['text'],
        components:{
            Graph,StackedGraph
        },
        data(){
            return{
                pageViewList:[],
                pagelength:0,
                pagechoose:1,
                allFood: {
                    code:0,
                    name:'',
                    material:'',
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
                },
                chartOptions: {
                    chart: {
                    type: "pie"
                    },
                    title: {
                    text: "Nutrition "
                    },
                    tooltip: {
                        pointFormat: '<b>{point.percentage:.1f}%</b>'
                    },
                    series: 
                    {
                        name:'양',
                        colorByPoint:true,
                        data: [
                            ]
                    }
                    
                },
                foods:[]
            }
        },
        mounted(){
            this.start();
        },
            methods : {
                start(){
                    let food = null;
                    this.foods=[];
                    for (var key in localStorage){
                        if(!Number(key))continue;
                        food = JSON.parse(localStorage.getItem(key));
                        this.foods.push(food);
                        this.allFood.supportpereat += food.supportpereat*food.quantity;
                        this.allFood.calory += food.calory*food.quantity;
                        this.allFood.carbo += food.carbo*food.quantity;
                        this.allFood.protein += food.protein*food.quantity;
                        this.allFood.fat += food.fat*food.quantity;
                        this.allFood.sugar += food.sugar*food.quantity;
                        this.allFood.natrium += food.natrium*food.quantity;
                        this.allFood.chole += food.chole*food.quantity;
                        this.allFood.fattyacid += food.fattyacid*food.quantity;
                        this.allFood.transfat += food.transfat*food.quantity;
                    }
                    this.pagelength = parseInt(this.foods.length/5);
                    if(this.foods.length%5>0) this.pagelength++;
                    this.pagechoose=1;
                    this.pagenation(1);
                    // alert(JSON.stringify(this.foods));
                    window.console.log(this.allFood);
                    this.$EventBus.$emit('update_graph_value');
                    this.$EventBus.$emit('update_stackedgraph_value');
                    //update_stackedgraph_value
                },
                close_Popup(){
                    this.$emit('close')
                },
                myIngestionInfo(){
                    this.$router.push('/cart');
                },
                show_graph(){
                    this.allFood.code++;
                },
                totalFoodInfo(){
                
                },pagenation(page){
                    // alert(page+" "+this.pagelength);
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
                        if(index<this.foods.length)
                            this.pageViewList.push(this.foods[index]);
                    }
                },delete_JJim(code){
                    alert(code);
                    localStorage.removeItem(code);
                    this.start();
                },JJim_to_Cart(){
                    let food = null;
                    this.foods=[];
                    for (var key in localStorage){
                        if(!Number(key))continue;
                        food = JSON.parse(localStorage.getItem(key));
                        localStorage.removeItem(key);
                        this.foods.push(food);
                    }
                    this.intake(this.foods);
                    this.start();
                    this.$EventBus.$emit('click-icon');
                },
                intake(foods){
                    if(this.$session.exists()){
                        
                        const today = new Date();
                        let todayDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "
                                +today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
                        let cartlist=[];
                        for (let i = 0; i < foods.length; i++) {
                            cartlist.push({
                                id: this.$session.get('jwt').id,
                                code:foods[i].code,
                                count:Number(foods[i].quantity),
                                time:todayDate,
                            });
                        }
                        
                        alert(JSON.stringify(cartlist));
                        http
                            .post("/api/daydetail/insert", cartlist)
                            .then(() => {
                                alert("추가 하였습니다.");
                            })
                            .catch(() => {
                            this.errored = true;
                            })
                            .finally(() => {
                    });
                }else{
                    alert("로그인을 먼저 하세요!");
                }
            }
        }
        
    }
</script>

<style lang="scss" scoped>
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