<template>
    <div>
        <div class="bradcam_area" style="background-image: url(../img/backgroundfoodimg/signup_top_bg_2.jpg);">
            <img src="img/notice.png" alt="" srcset="">
        </div>
        <table class="table table-hover">
			<thead>
				<tr>
                    <th scope="col">글번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성자</th>
                    <th scope="col">조회수</th>
                    <th scope="col">작성시간</th>
				</tr>
			</thead>
			<tbody id="notice">
                <tr v-for="notice in noticeList" :key="notice.no" @click="show_detail(notice.no)">
                    <td>{{notice.no}}</td>
                    <td>{{notice.title}}</td>
                    <td>{{notice.writer}}</td>
                    <td>{{notice.hit}}</td>
                    <td>{{notice.time}}</td>
                </tr>
			</tbody>
		</table>
		<ul class="pagination justify-content-center" style="margin:20px 0">
			<li class="page-item"><a class="page-link" href="#">Previous</a></li>
			<li class="page-item"><a class="page-link" href="#">1</a></li>
			<li class="page-item"><a class="page-link" href="#">2</a></li>
			<li class="page-item"><a class="page-link" href="#">3</a></li>
			<li class="page-item"><a class="page-link" href="#">Next</a></li>
		</ul>
        <input v-if="valid()" class="btn btn-primary" type="button" id="noticeWriter" value="글쓰기"/>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name:"notice",
        data(){
            return{
                noticeList:[],
            }
        },
        mounted(){
            this.start();
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
                this.$router.push("/noticeview/"+no);
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