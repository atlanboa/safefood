<template>
    <div class="d-flex flex-row flex-column p-2">
        <div class="d-flex justify-content-center">
            <input class="form-control" placeholder="number" v-model="food.quantity" type="number" value="1" style="max-width:160px;">
        </div>
        <div class="d-flex justify-content-center">
            <button class="genric-btn primary-border" @click="JJim(food)">찜</button>
            <button class="genric-btn primary" >Add</button>
        </div>
    </div>
</template>

<script>
    // import Vue from 'vue';
    // var eventBus = new Vue();
    export default {
        name:"addingestion",
        props:["food"],
        mounted(){
            
        },
        data(){
            return{

            }
        },
        methods: {
            JJim(inputFood){
                
                if(inputFood.quantity==null||inputFood.quantityL<1){
                    alert("찜갯수를 정하지 않았습니다.")
                }else{
                    let localValue = localStorage.getItem(inputFood.code);
                    alert(this.food.name+" "+this.food.quantity+"개 추가 완료")
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
            },
            
        },
    }
</script>

<style lang="scss" scoped>
.genric-btn primary{
    width: 50px;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>