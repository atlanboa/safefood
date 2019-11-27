<template>
    <div>
        <h1>FoodSetting</h1>
        <div class="row">
            <div class="col-8">
                <table class="table table-sm text-center">
                    <tr>
                        <th>사진</th>
                        <th>상품이름</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                    <tr v-for="food in foods" :key="food.code">
                        <td><img :src="'../'+food.img" style="width:50px; height:50px;"></td>
                        <td>{{food.name}}</td>
                        <td><a class="trash" @click="update_food(food.name)"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'pen-fancy'}"/></a></td>
                        <td><a class="trash" @click="delete_food(food.code)"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'trash-alt'}"/></a></td>
                    </tr>
                </table>
            </div>
            <div class="col-4">
                <button class="genric-btn success-border" @click="insert_food()">음식정보 삽입</button>
            </div>
        </div>
        
        
    </div>
</template>

<script>
import http from "../../../../http-common";
    export default {
        name:"foodsetting",
        data(){
            return{
                pageViewList:[],
                pagelength:0,
                pagechoose:1,
                foods: [],
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
            }
        },mounted(){
            this.start();
        },methods: {
            start(){
                http
                    .get("/api/search/" + "maker")
                    .then(response => (this.foods = response.data))
                    .catch(() => {
                    this.errored = true;
                    })
                    .finally(() => {
                    this.loading = false;
                    });
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
            },delete_food(code){
                if(confirm("정말로 삭제하시겠습니까?")){
                    http
                    .get("/api/foodelete/" + code)
                        .then(() => {

                        })
                        .catch(() => {
                        this.errored = true;
                        })
                        .finally(() => {
                        this.loading = false;
                        this.start();
                        });
                }
            },insert_food(){
                this.$router.push("/settingmain/foodinsert");
            },update_food(name){
                this.$router.push("/settingmain/foodupdate/"+name);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .trash{
        cursor: pointer;
    }
    .trash:hover{
        opacity: 0.5;
    }
</style>