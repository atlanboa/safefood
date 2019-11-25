<template>
    <div class="example-modal-content d-flex flex-column" >
        <div class="d-flex justify-content-center">
        <button class="genric-btn danger" @click="close_Popup">닫기</button>
        <button class="genric-btn danger" @click="close_Popup">섭취 식품으로 등록</button>
        <button class="genric-btn danger" @click="myIngestionInfo">내정보로 이동</button>
        </div>
        <div class="container">
            <table class="table table-sm text-center">
                <tr>
                    <th>상품이름</th>
                    <th>상품갯수</th>
                    <th>삭제할 상품 갯수</th>
                </tr>
                <tr v-for="(f, idx) in foods" :key="idx">

                    <td>{{f.name}}</td>
                    <td>{{f.quantity}}</td>
                    <td>
                        <input type="number">
                        <a href="#">
                            <i class="fa fa-trash fa-2x"></i> 
                        </a>
                    </td>
                </tr>
            </table>
        </div>
        <div>
            <mdb-icon fab icon="500px" />
            <!-- <button @click="totalFoodInfo">show graph</button> -->
            <charts :options="chartOptions"></charts>
            <Graph :food="allFood"></Graph>
        </div>
         
    </div>
</template>

<script>
import Graph from "./Graph.vue";
    export default {
        props: ['text'],
        components:{
            Graph
        },
        data(){
            return{
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
            let food = null;
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
            methods : {
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
    
</style>