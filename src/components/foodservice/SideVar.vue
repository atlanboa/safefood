<template>
    <div  id="sidevar">
        <div id="JJim_box" class="d-flex flex-column ">
            <div id="leftCol" class="d-flex justify-content-center rounded-lg" @click="JJimList()">
                <div id="JJim_content">
                    <table class="table table-sm">
                        <tr v-for="(f, idx) in foods" :key="idx">
                            <td >
                                <img :src="f.img" style="width:50px; height:50px;">
                                <div v-html="f.quantity" style="text-align: center;"></div>
                                <!-- :style="{backgroundImage:url(f.img)}" -->
                            </td>
                        </tr>
                    </table>
                </div>
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
        props:["componentKey"],
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
            
        },created(){
            this.$EventBus.$on('click-icon', () => {
                this.start();
            });
        },
        mounted(){
            this.start();
        }
        ,methods: {
            start(){
                let food = null;
                this.foods=[];
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
            },
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
            },
            forceRerender() {
                this.componentKey += 1;
            }
        },

    }
</script>

<style lang="scss" scoped>
    #leftCol {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 11px;
        padding: auto;
        margin-top: 20%;
        margin-left:15px;
        position: fixed;
        height: 350px;
        width: 100px;
        background-color: white; 
        font-size: 1em;
        overflow-y: scroll;
        z-index: 1;
        border: 10px solid #DDD;
        &::-webkit-scrollbar { 
        display: none !important; // 윈도우 크롬 등
        }
    }
    #JJim_content {
        position: relative;
        
        // scroll
    }
    #JJim_box{
        cursor: pointer;
    }
    @media screen and (max-width: 1100px) { #sidevar { display: none; } }
</style>