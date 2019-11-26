<template>
  <div>
      <div
      class="bradcam_area"
      style="background-image: url(../img/backgroundfoodimg/signup_top_bg_2.jpg);"
    >
      <h3>공지사항</h3>
    </div>
    <br>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
          <th>제목</th>
          <th>{{notice.title}}</th>
        </tr>
        </thead>
        <tbody id="notice">
          
          <tr>
            <th>작성자</th>
            <th>{{notice.writer}}</th>
          </tr>
          <tr>
            <th>내용</th>
            <th>{{notice.content}}</th>
          </tr>

          <tr>
            <th>조회수</th>
            <th>{{notice.hit}}</th>
          </tr>
          <tr>
            <th>작성시간</th>
            <th>{{notice.time}}</th>
          </tr>
      </tbody>
    </table>
    <input v-if="valid()" type="button" class="btn btn-outline-danger" value="삭제" id="delete" @click="delete_notice"/>
    </div>
    
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "NoticeView",
  props:["no"],
  data() {
    return {
      notice: {}
    };
  },
  mounted() {
      this.start();
  },
  methods: {
    start() {
      http
        .get("api/notice/"+this.no)
        .then(response => {
            
            this.notice = response.data;
            window.console.log(response.data)
            })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
          window.console.log(this.notice);
        });
    },
    delete_notice(){
        
        http
        .get("api/noticeDelete/"+this.no)
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
        this.$EventBus.$emit('delete_notice');
        this.$router.push("/notice");
    },
    show_detail(no) {
      alert(no);
    },
    valid() {
      if (this.$session.exists() && this.$session.get("jwt").id == "ssafy") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>