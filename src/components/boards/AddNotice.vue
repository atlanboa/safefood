<template>
    <div>

    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name:"addnotice",
        data(){
            return{
                noticeList:[],
            }
        },
        mounted(){
            
        },
        methods: {
            start(){
                http
                .get("api/notice")
                    .then(response => (this.noticeList = response.data))
                    .catch(() => {this.errored = true;})
                    .finally(() => {this.loading = false; window.console.log(this.noticeList);
                    });
            },
            show_detail(no){
                alert(no);
            },
            valid() {
                if (this.$session.exists()&&this.$session.get('jwt').id=='ssafy') {
                    return true;
                } else {
                    return false;
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>