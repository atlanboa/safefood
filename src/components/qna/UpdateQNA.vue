<template>
    <div>
        <div class="bradcam_area" style="filter:grayscale(50%); background-image: url(../img/backgroundfoodimg/qna_top_bg.jpg);">
            <h3>SignUP</h3>
        </div>
        <br>
        <div class="container">
            <form @submit.prevent="updateQNA">
                <table class="table table-hover form-group">
                    <tr class="table-active">
                        <td colspan="2"><h1>글 수 정</h1></td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td><input type="text" class="form-control" v-model="qna.title" ></td>
                    </tr>
                    <tr>
                        <td>작성자</td>
                        <td><input type="text" class="form-control" v-model="qna.writer"></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea class="form-control" rows="5" v-model="qna.content"></textarea></td>
                    </tr>
                </table>
                <button class="btn btn-primary" type="submit">수정</button>
            </form>
        </div>
    </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import http from "../../http-common";
    export default {
        name:"updateqna",
        props:["no"],
        data(){
            return{
               qna:{
                   no:this.no,
                   title:null,
                   content:null,
                   writer:null,
                   hit:null,
                   time:null
               }, 
            }
        },
        mounted(){
            http
                .get("api/qnano/"+this.no)
                .then(response => { this.qna=response.data;
                    
                })
                .catch(() => {
                this.errored = true;
                })
                .finally(() => (this.loading = false));
        },
        methods:{
            updateQNA(){
                http
                    .put("api/updateqna",this.qna)
                    .then(response => {
                        if(response.data == true){
                            alert('등록 됨');
                        }else{
                            alert('등록 실패요');
                        }
                        location.href="/";
                    })
                    .catch(() => {
                    this.errored = true;
                    })
                    .finally(() => (this.loading = false));
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>