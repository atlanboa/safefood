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
                                        <router-link to="/mainpage">Home</router-link>
                                      </li>
                                      <li>
                                        <router-link to="/foodlist">food</router-link>
                                      </li>
                                      <li><a href="about.html">About</a></li>
                                      <li><a href="#">blog <i class="ti-angle-down"></i></a>
                                          <ul class="submenu">
                                              <li><a href="blog.html">blog</a></li>
                                              <li><a href="single-blog.html">single-blog</a></li>
                                          </ul>
                                      </li>
                                      <li><a href="#">pages <i class="ti-angle-down"></i></a>
                                          <ul class="submenu">
                                              <li><a href="elements.html">elements</a></li>
                                          </ul>
                                      </li>
                                      <li><a href="contact.html">Contact</a></li>
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
                                  <a class="popup-with-form" href="#test-form">Book A Room</a>
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
// import HelloWorld from './components/HelloWorld.vue'
// import Header from './components/Header.vue'
import Footer from './components/Footer.vue'


export default {
  name: 'app',
  mounted() {
    this.$router.push('/mainpage')
  },
  components: {
   Footer
  }
}
</script>

<style>

</style>
