<template>
    <div>
        <h1>Notice Setting</h1>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">글번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성자</th>
                    <th scope="col">조회수</th>
                    <th scope="col">작성시간</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody id="notice">
                <tr v-for="notice in noticeList" :key="notice.no">
                    <td>{{notice.no}}</td>
                    <td>{{notice.title}}</td>
                    <td>{{notice.writer}}</td>
                    <td>{{notice.hit}}</td>
                    <td>{{notice.time}}</td>
                    <td><a class="trash" @click="update_notice(notice.no)"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'pen-fancy'}"/></a></td>
                    <td><a class="trash" @click="delete_notice(notice.no)"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'trash-alt'}"/></a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import http from "../../../../http-common";
    export default {
        name:"noticesetting",
        data(){
            return{
                noticeList:[],
            }
        },
        created(){
        },mounted(){
            this.start();
            //
        },
        methods: {
            start(){
                this.noticeList=[];
                http
                .get("api/notice")
                    .then(response => (this.noticeList = response.data))
                    .catch(() => {this.errored = true;})
                    .finally(() => {this.loading = false; window.console.log(this.noticeList);
                });
            },
            delete_notice(no){
                http
                .get("api/noticeDelete/"+no)
                .then(response => {
                    window.console.log(response.data)
                    })
                .catch(() => {
                this.errored = true;
                })
                .finally(() => {
                this.loading = false;
                window.console.log(this.notice);
                });
                this.start();
            },update_notice(no){
                this.$router.push("/settingmain/noticeupdate/"+no);
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