<template>
    <div>
    <div class="bradcam_area breadcam_bg_1">
      <h3>PassWord Search</h3>
    </div>
    <br>
    <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="contact-title">PassWord Search</h2>
        <p>※관리자는 사용자의 비밀번호를 절대 묻지 않습니다.</p>
      </div>
      <div class="col-lg-8">
        <form class="form-contact contact_form" method="post" id="contactForm" novalidate="novalidate">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                  <p>아이디와 사이트에 등록한 핸드폰 번호를 입력하세요.</p>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <input v-model="user.id" class="form-control valid" name="id" id="id" type="text" placeholder="Enter your id"/>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <input v-model="user.pass" class="form-control valid" name="phone" id="phone" type="number" placeholder="Enter your PhoneNumber"/>
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
    export default {
        name:"passwordsearch",
        data(){
            return{
                user:{}
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>