<template>
    <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>Update</h3>
    </div>
    <br>
    <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="contact-title">SignUP</h2>
      </div>
      <div class="col-lg-8">
        <form class="form-contact contact_form" method="post" id="contactForm" novalidate="novalidate" @submit.passive="userUpdate">
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
                        <div v-for="(all, index) in allergies" :key="index" class="switch-wrap d-flex justify-content-between col-xl-1 col-md-3">
                            <p>{{all}}</p>
                            <div class="primary-checkbox">
                                <input v-if="allCheck(all)" v-model="userall" :id="all" :value="all" class="allergy" type="checkbox" checked>
                                <input v-else v-model="userall" :id="all" :value="all" class="allergy" type="checkbox">
                                <label :for="all" ></label>
                            </div>
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
      <div class="col-lg-3 offset-lg-1">
        
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
    export default {
        name:"userinfo",
        props:["id"],
        data(){
            return{
                pageIndex:0,
                allergies: ["대두","땅콩","우유","게","새우","참치","연어","쑥","소고기","닭고기","돼지고기","복숭아","민들레","계란흰자"],
                userall:[],
                user:{
                    id:this.$session.get('jwt').id,
                    pass:this.$session.get('jwt').pass,
                    name:this.$session.get('jwt').name,
                    phone:this.$session.get('jwt').phone,
                    address:this.$session.get('jwt').address,
                    allergy:this.$session.get('jwt').allergy
                    
                }
            }
        },mounted(){
            window.console.log(this.$session.get('jwt').allergy)
        },methods:{
            userUpdate(){
                window.console.log(this.user);
                for (let index = 0; index < this.userall.length; index++) {
                    this.user.allergy+=this.userall[index]+" ";
                }
                http
                .put("api/updateUser",this.user)
                .then(response => {
                    if(response.data == true){
                        alert('수정 완료');
                    }else{
                        alert('수정 실패');
                    }
                    this.$router.push("/userinfo"+"?" + this.pageIndex++);
                })
                .catch(() => {
                this.errored = true;
                })
                .finally(() => (this.loading = false));
            },
            allCheck(all){
                if(this.$session.get('jwt').allergy.indexOf(all)>-1){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>