<template>
    <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>SignUP</h3>
    </div>
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
        data(){
            return{
                user:{}

            }
        },
        methods:{
            login(){
                http
                .post("api/insertUser",this.user)
                .then(response => {
                    this.user = response.data;
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => {
                    this.loading = false;
                });
                this.$router.push('/')
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>