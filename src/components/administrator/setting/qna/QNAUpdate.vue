<template>
    <div>
        <h1>QNA Update</h1>
        <table class="table">
        <thead>
        <tr>
          <th>제목</th>
          <th>
            <input class="form-control" type="text" v-model="qna.title" placeholder="Write Title" />
          </th>
        </tr>
        </thead>
      <tbody>

        <tr>
          <th>작성자</th>
          <th>
            <input class="form-control" type="text" v-model="qna.writer"/>
          </th>
        </tr>
        <tr>
          <th>내용</th>
          <th>
            <textarea v-model="qna.content" class="form-control w-100" name="content" id="content" cols="30" rows="9"
                     placeholder="Write Comment"></textarea>
            
          </th>
        </tr>
        <tr>
          <th>조회수</th>
          <th>{{qna.hit}}</th>
        </tr>
      </tbody>
    </table>
    <input type="button" class="genric-btn info" value="추가" id="update" @click="update_qna()"/>
    </div>
</template>

<script>
import http from "../../../../http-common";
    export default {
        name:"qnaupdate",
        props:["no"],
        data(){
            return{
                qna:{}
            }
        },
        mounted() {
            http
                .get("api/qnano/" + this.no)
                .then(response => {
                    this.qna = response.data;
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
        },methods: {
            update_qna(){
                http
                    .put("api/updateqna",this.qna)
                    .then(response => {
                        if(response.data == true){
                            alert('등록 됨');
                            this.$router("settingmain/notice");
                        }else{
                            alert('등록 실패요');
                        }
                        
                    })
                    .catch(() => {
                    this.errored = true;
                    })
                    .finally(() => (this.loading = false));
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>