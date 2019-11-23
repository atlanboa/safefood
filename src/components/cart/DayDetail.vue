<template>
  <div class="example-modal-content" @click="close_Popup">

  </div>
</template>

<script>
export default {
  props: ['data'],
  mounted(){
      //mounted 될때 비동기로 props로 받아온 data
      // data.userid, data.date 로 사용하면 된다.
      window.console.log(this.data)
  },
  methods : {
      close_Popup(){
          
          this.$emit('close')
      }
  }
}
</script>