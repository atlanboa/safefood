<template>
    <div>
        <h1>Q &amp; A Setting</h1>
        <table class="table table-hover">
            <thead>
            <tr>
                <td scope="row">글번호</td>
                <td>제목</td>
                <td>작성자</td>
                <td>조회수</td>
                <td>작성시간</td>
                <td>삭제</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="qna in qnas" :key="qna.no">
                <td v-html="qna.no"></td>
                <td v-html="qna.title"></td>
                <td v-html="qna.writer"></td>
                <td v-html="qna.hit"></td>
                <td v-html="qna.time"></td>
                <td><a class="trash" @click="delete_qna(qna.no)"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'trash-alt'}"/></a></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import http from "../../../../http-common";
    export default {
        name:"qnasetting",
        data(){
            return{
                qnas:{}
            }
        },
        mounted(){
            this.start();
        },
        methods: {
            start() {
                http
                    .get("api/qna")
                    .then(response => (this.qnas = response.data))
                    .catch(() => {
                    this.errored = true;
                    })
                    .finally(() => {
                    this.loading = false;
                    window.console.log(this.qnas);
                    });
                },
            delete_qna(no){
                http
                    .get("api/deleteqna/"+no)
                    .then(() => {})
                    .catch(() => {
                    this.errored = true;
                    })
                    .finally(() => {
                    this.loading = false;
                    window.console.log(this.qnas);
                    });
                
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