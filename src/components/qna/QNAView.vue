<template>
  <div>
    <div class="bradcam_area" style="filter:grayscale(50%); background-image: url(../img/backgroundfoodimg/qna_top_bg.jpg);">
      <h3>Q &amp; A</h3>
    </div>
    <br />
    <div class="container">
      <div class="single-post">
        <div class="blog_details">
            <h2>{{qna.title}}
            </h2>
            <ul class="blog-info-link mt-3 mb-4">
              <li><a href="#"><i class="fa fa-user"></i> Travel, Lifestyle</a></li>
              <li><a href="#"><i class="fa fa-comments"></i> hits : {{qna.hit}}</a></li>
            </ul>
            <p class="excert">
              {{qna.content}}
            </p>
        </div>
      </div>
      <div class="blog-author">
        <div class="media align-items-center">
            <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'user' }" size="6x"/>
            <div class="media-body">
              <a href="#">
                  <h4>{{qna.writer}}</h4>
              </a>
              <p>{{qna.time}}</p>
            </div>
            <input type="button" class="genric-btn danger" value="delete" id="delete"/><!-- @click="delete_notice"-->
        </div>
      </div>
      <br><hr><br>
      <div class="comment-list">
         <div class="single-comment justify-content-between d-flex" v-for="(ans, index) in answers" :key="index">
            <div class="user justify-content-between d-flex">
               <div class="thumb">
                  <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'user' }" size="3x"/>
               </div>
               <div class="desc">
                  <p class="comment" v-html="ans.content">
                     
                  </p>
                  <div class="d-flex justify-content-between">
                     <div class="d-flex align-items-center">
                        <h5>
                           <a href="#">Administrator</a>
                        </h5>
                     </div>
                  </div>
               </div>
            </div>
            <div class="reply-btn" >
              <a href="#" class="btn-reply text-uppercase " @click="delComment(ans.cno)">delete</a>
            </div>
         </div>
      </div>
      <br><hr><br>
      <h4>Comment</h4>
      <form @submit="addComment">
        <div class="row">
            <div class="col-12">
               <div class="form-group">
                  <textarea v-model="comment" class="form-control w-100" name="comment" id="comment" cols="30" rows="5"
                     placeholder="Write Comment"></textarea>
               </div>
              <div class="form-group">
                  <button type="submit" class="button button-contactForm btn_1 boxed-btn">Send Message</button>
              </div>
            </div>
        </div>

      </form>
      <button class="genric-btn success" @click="updateQNA()">QNA 수정</button>
      <button class="genric-btn danger" @click="deleteQNA()">QNA 삭제</button>
      
    </div>
    <br>
    <br>
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
      this.$router.push("/updateqna/" + this.no);
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