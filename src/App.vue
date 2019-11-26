<template>
  <div id="app">
    <header>
      <div class="header-area ">
          <div id="sticky-header" class="main-header-area">
              <div class="container-fluid p-0">
                  <div class="row align-items-center no-gutters">
                      <div class="col-xl-5 col-lg-6">
                        
                          <div class="main-menu  d-none d-lg-block">
                              <nav>
                                  <ul id="navigation">
                                      <li>
                                        <!-- <a class="active" href="/">home</a> -->
                                        <router-link to="/">Home</router-link>
                                      </li>
                                      <li>
                                        <router-link to="/foodlist">food</router-link>
                                      </li>
                                      <li>
                                        <router-link to="/about">About</router-link>
                                     </li>
                                      <li><a href="#">boards <i class="ti-angle-down"></i></a>
                                          <ul class="submenu">
                                            <li><router-link to="/notice">Notice</router-link></li>
                                            <li><router-link to="/qna">Free</router-link></li>
                                            <li><router-link to="/qna">Q&amp;A</router-link></li>
                                          </ul>
                                      </li>
                                      <li v-if="valid()"><a href="#">User<i class="ti-angle-down"></i></a>
                                          <ul class="submenu">
                                              <li><router-link to="/cart">food</router-link></li>
                                              <li><a href="single-blog.html">single-blog</a></li>
                                          </ul>
                                      </li>
                                      <li>
                                        
                                      </li>
                                  </ul>
                              </nav>
                          </div>
                      </div>
                      <div class="col-xl-2 col-lg-2">
                          <div class="logo-img">
                              <a href="index.html">
                                  <img src="img/logo.png" alt="">
                              </a>
                          </div>
                      </div>
                      <div class="col-xl-5 col-lg-4 d-none d-lg-block">
                          <div class="book_room">
                              <div class="socail_links">
                                  <ul>
                                    <li>
                                      <router-link to="/signup" v-if="!valid()"><img class="fa" src="img/signup.png" width="50px" height="20%"></router-link>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i class="fa fa-facebook-square"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                          <i class="fa fa-twitter"></i>
                                          </a>
                                      </li>
                                      <li>
                                          <a href="#">
                                              <i class="fa fa-instagram"></i>
                                          </a>
                                      </li>
                                      <li v-if="valid()">
                                        <router-link class="right_side_menu" to="/userinfo" >{{this.$session.get('jwt').id}}</router-link>
                                      </li>
                                      <li v-if="valid()" >
                                        <a class="right_side_menu" @click="logout">LOGOUT</a>
                                      </li>
                                      <li v-if="!valid()"  style="position:relative">
                                        <a class="right_side_menu" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                          LOGIN
                                        </a>
                                        <div class="collapse" id="collapseExample" style="position: absolute; z-index: 100; right: 0px; width: 250px;">

                                          <div class="card card-body bg-dark" id="loginWindow">
                                            <form @submit="login">
                                              <label class="text-white">아이디</label><br>
                                              <input v-model="id" type="text" class="form-control" name="id" id="identifier" required><br>
                                              <label class="text-white">비밀번호</label><br>
                                              <input v-model="pass" type="password" class="form-control" name="pass" id="password" required><br> <br> 
                                              <input type="submit" class="btn btn-light" value="로 그 인" id="login" style="width:100%;">
                                            </form>
                                            <a class="btn btn-dark" href="#">비밀번호 찾기</a>
                                          </div>
                                        </div>
                                      </li>

                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="col-12">
                          <div class="mobile_menu d-block d-lg-none"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </header>
    <section>
      <router-view/>
    </section>
    <div>
      
      <Footer/>
      
    </div>
    <a id="back-to-top" href="#" class="btn btn-light btn-lg back-to-top" role="button"><i class="fas fa-chevron-up"></i></a>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import http from './http-common.js';
// import Calendar from './components/calendar/Calendar.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



export default {
  name: 'app',
  data(){
    return{
      id:"",
      pass:"",
      pageIndex:0,
    }
  },
  mounted() {
    this.$router.push('/'+'?'+this.pageIndex++)
  },
  components: {
   Footer,
   
  },methods:{
    login() {
      http
        .post("api/login", {
          id: this.id,
          pass: this.pass
        })
        .then(
          response => {
            if (response.status === 200 /*&& "token" in response.body*/) {
              window.console.log("로그인 성공");
              this.$session.start();
              this.$session.set("jwt", response.data);
              // this.$http.headers.common["Authorization"] =
              //   "Bearer " + response.body.token;
              window.console.log(this.$session.getAll());
            }
          },
          function(err) {
            window.console.log("err", err);
          }
        )
        .finally(() => {
          window.console.log();
          
          
        });
    },
    logout() {
          this.$session.destroy();
          window.console.log("로그아웃");
          this.$router.push('/?'+this.pageIndex++)
        },
    valid() {
      if (this.$session.exists()) {
        return true;
      } else {
        return false;
      }
    },
    userInfo(){
      this.$router.push("/userinfo");
    }
  }
}
</script>

<style>
.back-to-top {
    position: fixed;
    bottom: 25px;
    right: 25px;
    display: none;
}
.right_side_menu{
    background-color: transparent;
    border:0px;
    color:white;
    font-weight: 500;
}
</style>
