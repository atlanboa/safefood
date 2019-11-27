<template>
    <div>
        <h1>UserSetting</h1>
        <table class="table table-sm text-center">
            <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>주소</th>
                <th>전화번호</th>
                <th>알러지 정보</th>
                <th>삭제</th>
            </tr>
            <tr v-for="user in users" :key="user.id">
                <td>{{user.id}}</td>
                <td>{{user.name}}</td>
                <td>{{user.address}}</td>
                <td>{{user.phone}}</td>
                <td>{{user.allergy}}</td>
                <td><a v-if="user.id!='ssafy'" class="trash" @click="delete_user(user.id)"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'trash-alt'}"/></a></td>
            </tr>
        </table>
    </div>
</template>

<script>
import http from "../../../../http-common";
    export default {
        name:"userSetting",
        data(){
            return{
                users:[],
            }
        },mounted(){
            this.start();
        },methods: {
            start(){
                http
                .get("api/getalluser")
                .then(response => {
                    this.users = response.data;
                })
                .catch(() => {
                    
                })
                .finally(() => (this.loading = false));
            },
            delete_user(id){
                alert(id);
                let user ={
                    "id":id,
                }
                http
                .post("api/deleteUser",user)
                .then(() => {
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => {this.start();});
            }
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