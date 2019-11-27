<template>
    <div>
        <h1>Notice Update</h1>
        <table class="table">
        <thead>
        <tr>
          <th>제목</th>
          <th>
            <input class="form-control" type="text" v-model="notice.title" placeholder="Write Title" />
          </th>
        </tr>
        </thead>
      <tbody>

        <tr>
          <th>작성자</th>
          <th>
            <input class="form-control" type="text" v-model="notice.writer"/>
          </th>
        </tr>
        <tr>
          <th>내용</th>
          <th>
            <textarea v-model="notice.content" class="form-control w-100" name="content" id="content" cols="30" rows="9"
                     placeholder="Write Comment"></textarea>
            
          </th>
        </tr>
        <tr>
          <th>조회수</th>
          <th>{{notice.hit}}</th>
        </tr>
      </tbody>
    </table>
    <input type="button" class="genric-btn info" value="추가" id="update" @click="update_notice()"/>
    </div>
</template>

<script>
import http from "../../../../http-common";
    export default {
        name:"Notice Update",
        props:["no"],
        data(){
            return{
                notice:{}
            }
        },mounted() {
            http
                .get("/api/notice/"+this.no)
                    .then(response => {
                        this.notice=response.data;
                    })
                    .catch(() => {
                    this.errored = true;
                    })
                    .finally(() => {
                    this.loading = false;
                    });
        },methods: {
            update_notice(){
                http
                .post("/api/noticeUpdate/",this.notice)
                    .then(() => {
                        
                    })
                    .catch(() => {
                    this.errored = true;
                    })
                    .finally(() => {
                    this.loading = false;
                    });
                this.$router.push("/settingmain/notice");
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>