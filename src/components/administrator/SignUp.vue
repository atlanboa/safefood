<template>
  <div>
    <div class="bradcam_area" style="background-image: url(../img/backgroundfoodimg/signup_top_bg_2.jpg);">
      <h3>SignUP</h3>
    </div>
    <br>
    <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="contact-title">SignUP</h2>
      </div>
      <div class="col-lg-8">
        <form class="form-contact contact_form" method="post" id="contactForm" novalidate="novalidate" @submit.passive="signup">
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
            <div class="col-sm-6">
              <div class="form-group">
                <input v-model="user.name" class="form-control valid" name="name" id="name" type="text" placeholder="Enter your name"/>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <input v-model="user.phone" class="form-control valid" name="call" id="call" type="text" placeholder="phone number"/>
              </div>
            </div>

            <div class="col-12">
              <div class="form-group">
                <input v-model="user.address" class="form-control" name="address" id="address" type="text" placeholder="Enter Address"/>
              </div>
            </div>
            <div class="col-12">
                <div>
                    Allergies
                </div>
                <div class="form-group">
                  <div class="row" >
                      <div v-for="(all, index) in allergies" :key="index" class="col-3">
                        <span class="custom-control custom-checkbox">
                              <input v-model="userall" :id="all" :value="all" class="allergy custom-control-input" type="checkbox">
                              <label :for="all" class="custom-control-label">{{all}}</label>
                        </span>
                      </div>
                    </div>

              </div>
            </div>
          </div>
          <div class="form-group mt-3">
            <button type="submit" class="button button-contactForm boxed-btn">Send</button>
          </div>
        </form>
      </div>
      <div class="col-lg-3 offset-lg-1" id="sideimg">
        <img src="img/backgroundfoodimg/signupImg.jpg">
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "signup",
  data() {
      return{
          allergies: ["대두","땅콩","우유","게","새우","참치","연어","쑥","소고기","닭고기","돼지고기","복숭아","민들레","계란흰자"],
          userall:[],
          user:{
            id:null,
            pass:null,
            address:null,
            phone:null,
            name:null,
            allergy:""
          }
      }

  },
  methods: {
    signup(){
      window.console.log(this.user);
      for (let index = 0; index < this.userall.length; index++) {
        this.user.allergy+=this.userall[index]+" ";
      }
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
        window.console.log(this.user);
      });
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss" scoped>
  #sideimg{
    overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 600px;
  }
</style>