<template>
  <div>
      <div
      class="bradcam_area"
      style="background-image: url(../img/backgroundfoodimg/signup_top_bg_2.jpg);"
    >
      <h3>Notice Boards</h3>
    </div>
    <br>
    <div class="container">

    <div class="single-post">
       <div class="blog_details">
         <h6>notice</h6>
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
    <br>
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