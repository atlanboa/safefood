<template>
  <div>
    <div class="bradcam_area" style="filter:grayscale(50%); background-image: url(../img/backgroundfoodimg/qna_top_bg.jpg);">
      <div><img src="img/signuppage.png" alt=""></div>
    </div>
    <br />
    <div class="container">
      <br><br>
      <h1 class="text-center">Q &amp; A</h1>
      <br>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button
            type="button"
            class="btn btn-outline-secondary dropdown-toggle"
            data-toggle="dropdown"
          >{{category}}</button>
          <div class="dropdown-menu">
            <div @click="categoryChange('제목')">제목</div>
            <div @click="categoryChange('작성자')">작성자</div>
            <div @click="categoryChange('내용')">내용</div>
          </div>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Search......"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          v-model="searchText"
          @keyup="search"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" disabled>검색</button>
        </div>
      </div>
      <table class="table table-hover">
        <tr>
          <td>글번호</td>
          <td>제목</td>
          <td>작성자</td>
          <td>조회수</td>
          <td>작성시간</td>
        </tr>
        <tr v-for="qna in qnas" :key="qna.no" @click="show_detail(qna.no)">
          <td v-html="qna.no"></td>
          <td v-html="qna.title"></td>
          <td v-html="qna.writer"></td>
          <td v-html="qna.hit"></td>
          <td v-html="qna.time"></td>
        </tr>
      </table>
      <button class="genric-btn info" @click="addQnA()">글쓰기</button>
    </div>
    <br><br>
    <br>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import http from "../../http-common";
export default {
  name: "qnalist",
  data() {
    return {
      category: "검색",
      searchText: "",
      qnas: [],
      loading: true,
      errored: false
      // searchAll: start()
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    show_detail(no) {
      this.$router.push("/qnaview/" + no);
    },
    addQnA() {
      this.$router.push("/addqna");
    },
    search() {
      if (this.searchText == "") {
        this.start();
      } else {
        http
          .get("api/qnatitle/" + this.searchText)
          .then(response => (this.qnas = response.data))
          .catch(() => {
            this.errored = true;
          })
          .finally(() => {
            this.loading = false;
            window.console.log(this.qnas);
          });
      }
    },
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
    categoryChange(target) {
      this.category = target;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>