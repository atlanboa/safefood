<template>
  <div class="example-modal-content" @click="close_Popup">

  </div>
</template>

<script>
export default {
  props: ['date'],
  mounted(){
      window.console.log(this.date)
  },
  methods : {
      close_Popup(){
          
          this.$emit('close')
      }
  }
}
</script>