<template>
    <div>
        <charts :options="chartOptions"></charts>    
        {{food}}
    </div>
    
</template>

<script>
    export default {
        name:"graph",
        props:["food"],
        data(){
            return{
                chartOptions: {
                    chart: {
                    type: "pie"
                    },
                    title: {
                    text: "Nutrition Information"
                    },
                    tooltip: {
                        pointFormat: '<b>{point.percentage:.1f}%</b>'
                    },
                    series: 
                    {
                        name:'양',
                        colorByPoint:true,
                        data: []
                    }
                    
                }
            }
        },
        mounted(){
        },
        methods: {
            
        },
        watch:{
            food(){
                this.chartOptions.series.data=[
                    {
                    name:'칼로리',
                    y:this.food.calory,
                    },
                    {
                    name:'탄수화물',
                    y:this.food.carbo,
                    },
                    {
                    name:'단백질',
                    y:this.food.protein,
                    },
                    {
                    name:'지방',
                    y:this.food.fat,
                    },
                    {
                    name:'당류',
                    y:this.food.sugar,
                    },
                    {
                    name:'나트륨',
                    y:this.food.natrium,
                    },
                    {
                    name:'콜레스테롤',
                    y:this.food.chole,
                    },
                    {
                    name:'포화지방산',
                    y:this.food.fattyacid,
                    },
                    {
                    name:'트렌스지방',
                    y:this.food.transfat,
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>