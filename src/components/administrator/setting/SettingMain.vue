<template>
    <div>
        <div class="bradcam_area setting_top" style="filter:grayscale(50%); background-image: url(../img/backgroundfoodimg/setting_top_bg.jpg);">
            <div>
                <h3>Setting</h3>
            </div>
        </div>
        <div class="wrapper">
            <!-- Sidebar -->
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h3>Setting Page</h3>
                </div>

                <ul class="list-unstyled components">
                    <p>Setting menu</p>
                    <li>
                        <a @click="settingHome()">SettingHome</a>
                    </li>
                    <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Boarders</a>
                        <ul class="collapse list-unstyled" id="pageSubmenu">
                            <li>
                                <router-link to="/settingmain/notice">notice</router-link>
                            </li>
                            <li>
                                <router-link to="/settingmain/qna">qna</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <router-link to="/settingmain/food">Food</router-link>
                    </li>
                    <li>
                        <router-link to="/settingmain/user">Users</router-link>
                    </li>
                </ul>

            </nav>
            <!-- Page Content -->
            <div id="content">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"settingMain",
        data(){
            return{

            }
        },
        mounted(){
            this.$router.push('/settingmain/home');
        },
        methods: {
            settingHome(){
                this.$router.push('/settingmain/home');
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";


body {
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}
#content{
    padding-top: 113px;
    min-height: 100vh;
    padding-left: 10px;
}
.wrapper {
    position: relative;
    display: flex;
    width: 100%;
}
#sidebar {
    padding-top: 113px;
    padding-bottom: 113px;
    width: 250px;
    // position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #6d7fcc;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}
#sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
}

#sidebar ul li.active > a, a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
}
ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #6d7fcc;
}
</style>