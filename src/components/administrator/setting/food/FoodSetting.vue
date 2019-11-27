<template>
    <div>
        <h1>FoodSetting</h1>
        <table class="table table-sm text-center">
            <tr>
                <th>사진</th>
                <th>상품이름</th>
                <th>삭제</th>
            </tr>
            <tr v-for="food in foods" :key="food.code">
                <td><img :src="'../'+food.img" style="width:50px; height:50px;"></td>
                <td>{{food.name}}</td>
                <td><a class="trash"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'trash-alt'}"/></a></td>
            </tr>
        </table>
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
            },
        },
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