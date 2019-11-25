<template>
    <div class="d-flex flex-row flex-column">
        <div class="d-flex justify-content-center">
            <input v-model="food.quantity" type="number" value="1"> 개
        </div>
        <div class="d-flex justify-content-center p-2">
            <button class="btn btn-primary" @click="JJim(food)">찜</button>
            <button class="btn btn-primary" >추가</button>
        </div>
    </div>
</template>

<script>
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
                
                if(inputFood.quantity==null||inputFood.quantityL<0){
                    alert("찜갯수를 정하지 않았습니다.")
                }else{
                    this.$emit('update');
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
            },
            
        },
    }
</script>

<style lang="scss" scoped>

</style>