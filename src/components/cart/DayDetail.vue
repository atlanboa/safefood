<template>
  <div class="example-modal-content" @click="close_Popup"></div>
</template>

<script>
import http from "../../http-common";
export default {
  props: ["data"],
  mounted() {
    //mounted 될때 비동기로 props로 받아온 data
    // data.userid, data.date 로 사용하면 된다.
    window.console.log(this.data);  
    http
      .post("/api/daydetail", {
        id: this.data.userid,
        time: this.data.date
      })
      .then(response => {this.userintake = response.data
      window.console.log("response.data :::::::: "+response.data)})
      .catch(() => {
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
      });

    
  },
  data() {
    return {
      userintake: {}
      /*
	private int no;
	private String id;
	private int code;
	private String img;
	private int count;
	protected double supportpereat;
	protected double calory
	protected double carbo;
	protected double protein;
	protected double fat;
	protected double sugar;
	protected double natrium;
	protected double chole	
	protected double fattyacid;
	protected double transfat;
	private String time;

      */
    };
  },
  methods: {
    close_Popup() {
      this.$emit("close");
    }
  }
};
</script>