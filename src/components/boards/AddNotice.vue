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
          <th>
            <input class="form-control" type="text" v-model="notice.title" />
          </th>
        </tr>
        </thead>
      <tbody>

        <tr>
          <th>작성자</th>
          <th>
            <input class="form-control" type="text" :value="this.$session.get('jwt').id" readonly />
          </th>
        </tr>
        <tr>
          <th>내용</th>
          <th>
            <textarea class="form-control rounded-0" type="text" v-model="notice.content" style="height:300px;"/>
          </th>
        </tr>
        <tr>
          <th>조회수</th>
          <th>{{notice.hit}}</th>
        </tr>
        <tr>
          <th>시간</th>
          <th>{{notice.time}}</th>
        </tr>
      </tbody>
    </table>
    <input type="button" class="btn btn-outline-primary" value="추가" id="update" @click="insert_notice"/>
    </div>
    
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "addnotice",
  props: ["no"],
  data() {
    return {
      notice: {
        no: 0,
        title: "",
        content: "",
        hit: 0,
        time: null
      }
    };
  },
  mounted() {},
  methods: {
    insert_notice() {
        this.notice.writer=this.$session.get('jwt').id;
        const today = new Date();

        this.notice.time = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "
                            +today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
        http
        .post("api/noticeInsert/",this.notice)
        .then(response => (this.notice = response.data))
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
          window.console.log(this.noticet);
        });
        this.$EventBus.$emit('add_notice');
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