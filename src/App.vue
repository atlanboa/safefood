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
                                      <li><a href="#">blog <i class="ti-angle-down"></i></a>
                                          <ul class="submenu">
                                              <li><router-link to="/cart">food</router-link></li>
                                              <li><a href="single-blog.html">single-blog</a></li>
                                          </ul>
                                      </li>
                                      <li><a href="#">pages <i class="ti-angle-down"></i></a>
                                          <ul class="submenu">
                                              <li><a href="elements.html">elements</a></li>
                                          </ul>
                                      </li>
                                      <li>
                                        <router-link to="/qna">Q&amp;A</router-link>
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
                                      <router-link to="/signup">signup</router-link>
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
                                  </ul>
                              </div>
                              <div class="book_btn d-none d-lg-block">
                                <router-link v-if="!valid()" class="popup-with-form" to="/login">Login</router-link>
                                
                                <a v-if="valid()">{{this.$session.get('jwt').id}}</a>
                                <a v-if="valid()" @click="logout">Logout</a>
                              </div>
                              <div v-if="!valid()" class="collapse" id="collapseExample" style="z-index: 100; right: 0px; width: 250px;">
                                  <div class="card card-body bg-dark" id="loginWindow">
                                    <form>
                                      <input type="hidden" name="command" value="login">
                                      <label class="text-white">아이디</label><br>
                                      <input type="text" class="form-control" name="id" id="identifier" required><br>
                                      <label class="text-white">비밀번호</label><br>
                                      <input type="password" class="form-control" name="pass" id="password" required><br> <br> 
                                      <input type="button" class="btn btn-light" value="로 그 인" id="login" style="width:100%;">
                                    </form>
                                    <a class="btn btn-dark" href="#">비밀번호 찾기</a>
                                  </div>
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
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
// import Calendar from './components/calendar/Calendar.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



export default {
  name: 'app',
  data(){
    return{
      pageIndex:0,
    }
  },
  mounted() {
    this.$router.push('/'+'?'+this.pageIndex++)
  },
  components: {
   Footer,
   
  },methods:{
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
    }
  }
}
</script>

<style>

</style>
