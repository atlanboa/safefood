<template>
    <div class="d-flex flex-row flex-column p-2">
        <div class="d-flex justify-content-center">
            <input class="form-control" placeholder="0" v-model="food.quantity" type="number" value="1" style="max-width:160px;">
        </div>
        <div class="d-flex justify-content-center">
            <button class="genric-btn primary-border" @click="JJim(food)">찜</button>
            <button class="genric-btn primary" @click="intake(food)">Add</button>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
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
                    alert(this.food.name+" "+this.food.quantity+"개 찜!!")
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
            intake(){
                if(this.$session.exists()){
                    let cartdata = {
                        id: this.$session.get('jwt').id,
                        code:this.food.code,
                        count:Number(this.food.quantity),
                    };
                    const today = new Date();
                    cartdata.time = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "
                            +today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
                    let cartlist=[];
                    cartlist.push(cartdata);
                    
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