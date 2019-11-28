<template>
    <div>
        <table class="table table-sm text-center"> 
            <tr>
                <th>음식 코드</th>
                <td>음식 코드는 자동으로 증가 합니다.</td>
            </tr>
            <tr>
                <th>음식 이름</th>
                <td><input v-model="food.name"></td>
            </tr>
            <tr>
                <th>열량</th>
                <td><input v-model="food.supportpereat"></td>
            </tr>
            <tr>
                <th>칼로리</th>
                <td><input v-model="food.calory"></td>
            </tr>
            <tr>
                <th>탄수화물</th>
                <td><input v-model="food.carbo"></td>
            </tr>
            <tr>
                <th>단백질</th>
                <td><input v-model="food.protein"></td>
            </tr>
            <tr>
                <th>지방</th>
                <td><input v-model="food.fat"></td>
            </tr>
            <tr>
                <th>설탕</th>
                <td><input v-model="food.sugar"></td>
            </tr>
            <tr>
                <th>나트륨</th>
                <td><input v-model="food.natrium"></td>
            </tr>
            <tr>
                <th>콜레스테롤</th>
                <td><input v-model="food.chole"></td>
            </tr>
            <tr>
                <th>지방산</th>
                <td><input v-model="food.fattyacid"></td>
            </tr>
            <tr>
                <th>트렌스 지방</th>
                <td><input v-model="food.transfat"></td>
            </tr>
            <tr>
                <th>브랜드</th>
                <td><input v-model="food.maker"></td>
            </tr>
            <tr>
                <th>첨가물</th>
                <td><textarea v-model="food.material"></textarea></td>
            </tr>
            <tr>
                <th>이미지 경로</th>
                <td><index v-model="food.img"/>></td>
            </tr>
        </table>
        <button @click="foodinsert()">음식 추가</button>
    </div>
</template>

<script>
import http from "../../../../http-common";
    export default {
        name:"foodinsert",
        props:["food"],
        data(){
            return{
                
            }
        },methods: {
            foodinsert(){
                http
                .post("/api/foodinsert/" + this.food)
                .then(() => {})
                .catch(() => {
                this.errored = true;
                })
                .finally(() => {
                this.loading = false;
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>