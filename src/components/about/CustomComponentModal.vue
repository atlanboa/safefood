<template>
  <div class="example-modal-content">
    <h1>{{text.name}}, {{text.age}}</h1>
    <p>Program Languages : {{ text.main_language }}</p>
    <p>SangSung Software Level : {{ text.main_language }}</p>
    <p>From : {{ text.from }}</p>
    <p>Hobby : {{ text.hobby }}</p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods : {
      close_Popup(){
          
          this.$emit('close')
      }
  }
}
</script>