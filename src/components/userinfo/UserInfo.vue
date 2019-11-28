<template>
    <div>
    <div class="bradcam_area" style="background-image: url(../img/backgroundfoodimg/update_top_bg_1.jpg);">
      <h3>Update</h3>
    </div>
    <br>
    <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="contact-title">Update</h2>
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
                    Allergies : {{user.allergy}}
                </div>
                <div class="form-group">
                    <div class="row" >
                        <div v-for="(all) in allergies" :key="all" class="col-3">
                          <span class="checkbox checkbox-success">
                            <input type="checkbox" class="styled" v-model="user.allergy" :value="all">
                            <label class="">{{all}}</label>
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
      <div  class="col-lg-3 offset-lg-1" id="sideimg">
        <img src="img/backgroundfoodimg/update_side_bg.jpg">
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
                    allergy:null
                }
            }
        },mounted(){
            this.user.allergy=this.$session.get('jwt').allergy.split(" ").slice(0,-1);
            window.console.log(this.$session.get('jwt'))
        },methods:{
            userUpdate(){
              let userallergy=''
              for (let i = 0; i < this.user.allergy.length; i++) {
                userallergy+=this.user.allergy[i]+" ";
              }
              this.user.allergy=userallergy;
                http
                .post("api/updateUser",this.user)
                .then(response => {
                    if(response.data == true){
                        alert('수정 완료');
                    }else{
                        alert('수정 실패');
                    }
                    this.$session.get('jwt').id=this.user.id;
                    this.$session.get('jwt').pass=this.user.pass;
                    this.$session.get('jwt').name=this.user.name;
                    this.$session.get('jwt').phone=this.user.phone;
                    this.$session.get('jwt').address=this.user.address;
                    this.$session.get('jwt').allergy=this.user.allergy;
                    location.href="/"//////////session 정보 변경 하는 방법좀 ...
                })
                .catch(() => {
                this.errored = true;
                })
                .finally(() => (this.loading = false));
            },
            allCheck(all){
                if(this.$session.get('jwt').allergy.indexOf(all)>-1){
                  // alert(all);
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
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