<template>
    <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>Login</h3>
    </div>
    <br>
    <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="contact-title">Login</h2>
      </div>
      <div class="col-lg-8">
        <form class="form-contact contact_form" method="post" id="contactForm" novalidate="novalidate" @submit.passive="login">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <input v-model="user.id" class="form-control valid" name="id" id="id" type="text" placeholder="Enter your id"/>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <input v-model="user.pass" class="form-control valid" name="pass" id="pass" type="password" placeholder="password"/>
              </div>
            </div>
            
          </div>
          <div class="form-group mt-3">
            <button type="submit" class="button button-contactForm boxed-btn">Send</button>
          </div>
        </form>
      </div>
      <div class="col-lg-3 offset-lg-1">
        
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
    export default {
        name:"login",
        props: {
          msg: String,

        },
        data(){
            return{
                user:{
                  id:null,
                  pass:null
                }

            }
        },
        methods:{
            login(){
                window.console.log(JSON.stringify(this.user));
                http
                .post("api/login",this.user)
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
                this.$router.push('/index.html')
                // function(err) {
                //   window.console.log("err", err);
                // }
              ).catch(() => {
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                });
                
            }
        },
        logout() {
          this.$session.destroy();
          window.console.log("로그아웃");
        },
        valid() {
          if (this.$session.exists()) {
            return true;
          } else {
            return false;
          }
        }

    }
</script>

<style lang="scss" scoped>

</style>