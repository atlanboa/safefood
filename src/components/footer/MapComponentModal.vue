<template>
  <GmapMap
  :center="{lat:36.10712548146168, lng:128.41610116303076}"
  :zoom="17"
  map-type-id="roadmap"
  style="width: 500px; height: 500px"
>
  <GmapMarker

    :position="{lat:36.10712548146168, lng:128.41610116303076}"
    :clickable="true"
    :draggable="true"
    @click='center="{lat:36.10712548146168, lng:128.41610116303076}"'
  />
</GmapMap>
</template>


<style>
#map_ma {
  width: 100%;
  height: 400px;
  clear: both;
  border: solid 1px red;
}
</style>



<script type="text/javascript">
export default {
  props: ["text"],
  methods: {
    close_Popup() {
      this.$emit("close");
    }
  }
};
</script>