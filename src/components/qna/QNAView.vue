<template>
  <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>SignUP</h3>
    </div>
    <br />
    <div class="container">
      <table class="table table-hover">
        <tr class="table-active">
          <td colspan="2">
            <h1 v-html="qna.title"></h1>
          </td>
        </tr>
        <tr>
          <td>작성자</td>
          <td v-html="qna.writer"></td>
        </tr>
        <tr>
          <td>내용</td>
          <td v-html="qna.content"></td>
        </tr>
        <tr>
          <td>조회수</td>
          <td v-html="qna.hit"></td>
        </tr>
      </table>
      <table class="table table-hover">
        <tr v-for="(ans, index) in answers" :key="index">
          <td class="table-active">Administrator</td>
          <td v-html="ans.content"></td>
          <td>
            <input
              class="btn btn-outline-dark"
              type="button"
              value="삭제"
              @click="delComment(ans.cno)"
            />
          </td>
        </tr>
      </table>
      <form @submit="addComment">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="답변 추가....."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            v-model="comment"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-primary" type="submit">추가</button>
          </div>
        </div>
      </form>
      <button class="btn btn btn-warning" @click="updateQNA">QNA 수정</button>
      <button class="btn btn btn-danger" @click="deleteQNA">QNA 삭제</button>
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import http from "../../http-common";
export default {
  name: "qnaview",
  props: ["no"],
  data() {
    return {
      qna: {},
      answers: [],
      loading: true,
      errored: false,
      comment: null
    };
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
    http
      .get("api/comment/" + this.no)
      .then(response => (this.answers = response.data))
      .catch(() => {
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    updateQNA() {
      this.$router.push("api/updateqna/" + this.no);
    },
    deleteQNA() {
      alert(this.no);
      http
        .get("api/deleteqna/" + this.no)
        .then(response => {
          if (response.data == true) {
            alert("삭제 완료");
          } else {
            alert("삭제 실패");
          }
          location.href = "/";
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    addComment() {
      http
        .post("api/insertcomment", {
          no: this.no,
          content: this.comment
        })
        .then(response => {
          if (response.data == true) {
            alert("덧글 입력");
          } else {
            alert("덧글 입력 실패");
          }

          location.href = "/";
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    delComment(cno) {
      http
        .get("api/deletecomment/" + cno)
        .then(response => {
          if (response.data == true) {
            alert("삭제 완료");
          } else {
            alert("삭제 실패");
          }
          location.href = "/";
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>