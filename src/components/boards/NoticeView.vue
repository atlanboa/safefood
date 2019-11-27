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

    <div class="single-post">

       <div class="blog_details">
          <h2>{{notice.title}}
          </h2>
          <ul class="blog-info-link mt-3 mb-4">
             <li><a href="#"><i class="fa fa-user"></i> Travel, Lifestyle</a></li>
             <li><a href="#"><i class="fa fa-comments"></i> hits : {{notice.hit}}</a></li>
          </ul>
          <p class="excert">
            {{notice.content}}
          </p>
       </div>
    </div>
    <div class="blog-author">
       <div class="media align-items-center">
          <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'user' }" size="6x"/>
          <div class="media-body">
             <a href="#">
                <h4>{{notice.writer}}</h4>
             </a>
             <p>{{notice.time}}</p>
          </div>
          <input v-if="valid()" type="button" class="genric-btn danger" value="delete" id="delete" @click="delete_notice"/>
       </div>
    </div>
    <div class="comment-form">
      <h4>Leave a Reply</h4>
      <form class="form-contact comment_form" action="#" id="commentForm">
         <div class="row">
            <div class="col-12">
               <div class="form-group">
                  <textarea class="form-control w-100" name="comment" id="comment" cols="30" rows="5"
                     placeholder="Write Comment"></textarea>
               </div>
            </div>
            <div class="col-sm-6">
               <div class="form-group">
                  <input class="form-control" name="name" id="name" type="text" placeholder="Name">
               </div>
            </div>
            <div class="col-sm-6">
               <div class="form-group">
                  <input class="form-control" name="email" id="email" type="email" placeholder="Email">
               </div>
            </div>
            <div class="col-12">
               <div class="form-group">
                  <input class="form-control" name="website" id="website" type="text" placeholder="Website">
               </div>
            </div>
         </div>
         <div class="form-group">
            <button type="submit" class="button button-contactForm btn_1 boxed-btn">Send Message</button>
         </div>
      </form>
    </div>

    
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
#notice_head{
  border: 3px solid black;
}
</style>