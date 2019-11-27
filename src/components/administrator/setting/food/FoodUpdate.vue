<template>
    <div>
        {{food}}
        <table class="table table-sm text-center"> 
            <tr>
                <th>음식 코드</th>
                <td><input v-model="food[0].code" readonly></td>
            </tr>
            <tr>
                <th>음식 이름</th>
                <td><input v-model="food[0].name"></td>
            </tr>
            <tr>
                <th>열량</th>
                <td><input v-model="food[0].supportpereat"></td>
            </tr>
            <tr>
                <th>칼로리</th>
                <td><input v-model="food[0].calory"></td>
            </tr>
            <tr>
                <th>탄수화물</th>
                <td><input v-model="food[0].carbo"></td>
            </tr>
            <tr>
                <th>단백질</th>
                <td><input v-model="food[0].protein"></td>
            </tr>
            <tr>
                <th>지방</th>
                <td><input v-model="food[0].fat"></td>
            </tr>
            <tr>
                <th>설탕</th>
                <td><input v-model="food[0].sugar"></td>
            </tr>
            <tr>
                <th>나트륨</th>
                <td><input v-model="food[0].natrium"></td>
            </tr>
            <tr>
                <th>콜레스테롤</th>
                <td><input v-model="food[0].chole"></td>
            </tr>
            <tr>
                <th>지방산</th>
                <td><input v-model="food[0].fattyacid"></td>
            </tr>
            <tr>
                <th>트렌스 지방</th>
                <td><input v-model="food[0].transfat"></td>
            </tr>
            <tr>
                <th>브랜드</th>
                <td><input v-model="food[0].maker"></td>
            </tr>
            <tr>
                <th>첨가물</th>
                <td><textarea v-model="food[0].material"></textarea></td>
            </tr>
            <tr>
                <th>이미지 경로</th>
                <td><input v-model="food[0].img"></td>
            </tr>
        </table>
        <button @click="foodupdate()">업데이트</button>
    </div>
</template>

<script>
import http from "../../../../http-common";
    export default {
        name:'foodupdate',
        props:["name"],
        data(){
            return{
                food:[]
            }
        },
        mounted(){
            http
                .get("/api/search/name/"+this.name)
                    .then(response => {
                        this.food=response.data;
                    })
                    .catch(() => {
                    this.errored = true;
                    })
                    .finally(() => {
                    this.loading = false;
                    });
        },
        methods: {
            foodupdate(){
                http
                    .post("/api/foodupdate",this.food[0])
                        .then(() => {

                        })
                        .catch(() => {
                        this.errored = true;
                        })
                        .finally(() => {
                        this.loading = false;
                        
                    });
                this.$router.push("/settingmain/food");
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>