<template>
    <div class="example-modal-content d-flex flex-column" >
        <div class="top_bg_area" style="background-image: url(../img/backgroundfoodimg/JJimlist_top_br.jpg);">
            <div>
                <h3>JJim List</h3>
            </div>
        </div>
        <div class="d-flex justify-content-center">
        <button class="genric-btn danger" @click="close_Popup">닫기</button>
        <button class="genric-btn danger" @click="close_Popup">섭취 식품으로 등록</button>
        <button class="genric-btn danger" @click="myIngestionInfo">내정보로 이동</button>
        </div>
        <br>
        <div class="row">
            <div class="col-7">
                <!-- <button @click="totalFoodInfo">show graph</button> -->
                <charts :options="chartOptions"></charts>
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
                    <!-- <tr v-for="(f, idx) in foods" :key="idx">
                        <td>{{f.name}}</td>
                        <td>{{f.quantity}}</td>
                        <td>
                            <input type="number">
                            <a href="#">
                                <i class="fa fa-trash fa-2x"></i> 
                            </a>
                        </td>
                    </tr> -->
                    <tr v-for="page in pageViewList" :key="page">
                        <td><img :src="page.img" style="width:50px; height:50px;"></td>
                        <td>{{page.name}}</td>
                        <td>{{page.quantity}}</td>
                        <td>
                            <button @click="delete_JJim(page.code)">
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
        
        
        
    </div>
</template>

<script>
//import Graph from "./Graph.vue";
    export default {
        props: ['text'],
        components:{
            //Graph
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
                    window.console.log(this.allFood)
                    this.chartOptions.series.data=[
                        {
                        name:'칼로리',
                        y:this.allFood.calory,
                        },
                        {
                        name:'탄수화물',
                        y:this.allFood.carbo,
                        },
                        {
                        name:'단백질',
                        y:this.allFood.protein,
                        },
                        {
                        name:'지방',
                        y:this.allFood.fat,
                        },
                        {
                        name:'당류',
                        y:this.allFood.sugar,
                        },
                        {
                        name:'나트륨',
                        y:this.allFood.natrium,
                        },
                        {
                        name:'콜레스테롤',
                        y:this.allFood.chole,
                        },
                        {
                        name:'포화지방산',
                        y:this.allFood.fattyacid,
                        },
                        {
                        name:'트렌스지방',
                        y:this.allFood.transfat,
                        },
                    ]
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
                        alert('첫 페이지 입니다.');
                    }
                    if(page>this.pagelength){
                        page=this.pagelength-1;
                        alert('끝 페이지 입니다.');
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
                }
        },computed:{
            
        },
        watch:{
            allFood(){
                this.chartOptions.series.data=[
                    {
                    name:'칼로리',
                    y:this.allFood.calory,
                    },
                    {
                    name:'탄수화물',
                    y:this.allFood.carbo,
                    },
                    {
                    name:'단백질',
                    y:this.allFood.protein,
                    },
                    {
                    name:'지방',
                    y:this.allFood.fat,
                    },
                    {
                    name:'당류',
                    y:this.allFood.sugar,
                    },
                    {
                    name:'나트륨',
                    y:this.allFood.natrium,
                    },
                    {
                    name:'콜레스테롤',
                    y:this.allFood.chole,
                    },
                    {
                    name:'포화지방산',
                    y:this.allFood.fattyacid,
                    },
                    {
                    name:'트렌스지방',
                    y:this.allFood.transfat,
                    },
                ]
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
}
</style>