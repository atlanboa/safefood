<template>
    <div>
        <div id="leftCol" class="d-flex flex-row" @click="JJimList()">
            <div class="d-flex align-items-center justify-content-center">
                <table class="table table-sm">
                     <tr v-for="(f, idx) in foods" :key="idx">
                        <td><img :src="f.img" style="width:50px; height:50px;">{{f.quantity}}</td>
                    </tr>
                </table>
                <!-- <button "> 찜 목록 </button> -->
            </div>
        </div>
        <div class="row">
            <modals-container />
        </div>
    </div>
</template>

<script>
    import JJimList from "./JJimList.vue";
    export default {
        name:"sidevar",
        data(){
            return{
                allFood: {
                    code:0,
                    name:null,
                    material:null,
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
                showModa:false,
                foods:[]
            }
            
        },mounted(){
            let food = null;
            for (let i = 0; i < localStorage.length; i++){
                if(!Number(localStorage.key(i)))continue;
                food = JSON.parse(localStorage.getItem(localStorage.key(i)));
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
        }
        ,methods: {
            JJimList(){
                this.$modal.show(
                    JJimList,
                    {
                        text:"test",
                        modal: this.$modal
                    },
                    {
                        name:"JJim",
                        width: "90%",
                        height: "90%",
                    }
                );
            }
        },
    }
</script>

<style lang="scss" scoped>
    #leftCol {
        margin-top: 30%;
        position: fixed;
        height: 300px;
        width: 150px;
        background-color: #DDD; 
        font-size: 21px;
        overflow-y: scroll;
        z-index: 0;
    }

    #content {
        position: relative;            
        margin-left: 150px;
    }
</style>