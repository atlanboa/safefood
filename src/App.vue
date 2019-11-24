<template>
  <div id="app">
    <header>
      <div class="header-area">
        <div id="sticky-header" class="main-header-area">
          <div class="container-fluid p-0">
            <div class="row align-items-center no-gutters">
              <div class="col-xl-5 col-lg-6">
                <div class="main-menu d-none d-lg-block">
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
                      <li>
                        <a href="#">
                          blog
                          <i class="ti-angle-down"></i>
                        </a>
                        <ul class="submenu">
                          <li>
                            <a href="blog.html">blog</a>
                          </li>
                          <li>
                            <a href="single-blog.html">single-blog</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">
                          pages
                          <i class="ti-angle-down"></i>
                        </a>
                        <ul class="submenu">
                          <li>
                            <a href="elements.html">elements</a>
                          </li>
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
                    <img src="img/logo.png" alt />
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
                    <!-- <router-link v-if="!valid()" class="popup-with-form" to="/login">Login</router-link> -->

                    <router-link to="/userinfo" v-if="valid()">{{this.$session.get('jwt').id}}</router-link>
                    <a v-if="valid()" @click="logout">Logout</a>
                  </div>
                  <div v-if="!valid()" style="position:relative">
                    <a
                      class="nav-link"
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >Login</a>
                    <div
                      v-if="!valid()"
                      class="collapse"
                      id="collapseExample"
                      style="position: absolute; z-index: 100; right: 0px; width: 250px;"
                    >
                      <div class="card card-body bg-dark" id="loginWindow">
                        <form @submit.prevent="login">
                          <input type="hidden" name="command" value="login" />
                          <label class="text-white">아이디</label>
                          <br />
                          <input
                            type="text"
                            class="form-control"
                            name="id"
                            id="identifier"
                            v-model="user.id"
                            required
                          />
                          <br />
                          <label class="text-white">비밀번호</label>
                          <br />
                          <input
                            type="password"
                            class="form-control"
                            name="pass"
                            id="password"
                            v-model="user.pass"
                            required
                          />
                          <br />
                          <br />
                          <input
                            type="submit"
                            class="btn btn-light"
                            value="로 그 인"
                            id="login"
                            style="width:100%;"
                          />
                        </form>
                        <a class="btn btn-dark" href="#">비밀번호 찾기</a>
                      </div>
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
      <router-view />
    </section>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Header from './components/Header.vue'
import Footer from "./components/Footer.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import http from "./http-common";

export default {
  name: "app",
  data() {
    return {
      user: {
        id: null,
        pass: null
      },
      pageIndex: 0
    };
  },
  mounted() {
    this.$router.push("/" + "?" + this.pageIndex++);
  },
  components: {
    Footer
  },
  methods: {
    login() {
      window.console.log(JSON.stringify(this.user));
      http
        .post("api/login", this.user)
        .then(
          response => {
            if (response.status === 200 /*&& "token" in response.body*/) {
              window.console.log("로그인 성공");
              this.$session.start();
              this.$session.set("jwt", response.data);
              // this.$http.headers.common["Authorization"] =
              //   "Bearer " + response.body.token;
              window.console.log(this.$session.getAll());
              this.$router.push("/?" + this.pageIndex++);
            }
          },
          
          // function(err) {
          //   window.console.log("err", err);
          // }
        )
        .catch(() => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    logout() {
      this.$session.destroy();
      window.console.log("로그아웃");
      this.$router.push("/?" + this.pageIndex++);
    },
    valid() {
      if (this.$session.exists()) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
</style>
