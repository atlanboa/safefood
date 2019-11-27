import Vue from 'vue';
import VueRouter from 'vue-router';
import MainHeader from '../components/mainpage/MainPage.vue';

import FoodList from '../components/foodservice/FoodList.vue';
import FoodView from '../components/foodservice/FoodView.vue';
import UserInfo from '../components/userinfo/UserInfo.vue';

import SettingMain from '../components/administrator/setting/SettingMain.vue';
import SettingHome from '../components/administrator/setting/SettingHome.vue';
import FoodSetting from '../components/administrator/setting/food/FoodSetting.vue';
import UserSetting from '../components/administrator/setting/user/UserSetting.vue';
import NoticeSetting from '../components/administrator/setting/notice/NoticeSetting.vue';
import QNASetting from '../components/administrator/setting/qna/QNASetting.vue';

import SignUp from '../components/administrator/SignUp.vue';
import Login from '../components/administrator/Login.vue';

import QNAList from "../components/qna/QNAList.vue";
import QNAView from "../components/qna/QNAView.vue";
import AddQNA from "../components/qna/AddQNA.vue";
import UpdateQNA from "../components/qna/UpdateQNA.vue";

import Notice from "../components/boards/NoticeList.vue"
import NoticeView from "../components/boards/NoticeView.vue"
import AddNotice from "../components/boards/AddNotice.vue"

import About from '../components/about/About.vue';

import Cart from '../components/cart/Cart.vue';
// import VAnimateCss from 'v-animate-css';

// Vue.use(VAnimateCss);
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"mainpage",
    alias:"mainpage",
    component: MainHeader
  },
  {
    path:"/foodlist",
    name:"foodlist",
    component: FoodList
  },
  {
    path: "/foodview/:code",
    name: "foodview",
    component: FoodView,
    props:true
  },
  {
  path: "/signup",
  name: "signup",
  component: SignUp,
  props:true
  },
  {
    path: "/userinfo",
    name: "userinfo",
    component: UserInfo,
    props:true
    },
  {
    path: "/login",
    name: "login",
    component: Login,
    props:true
  },
  {

    path: "/qna",
    name: "qnalist",
    component: QNAList
  },
  {
      path: "/qnaview/:no",
      name: "qnaview",
      component: QNAView,
      props:true
  },
  {
      path: "/addqna",
      name: "addqna",
      component: AddQNA
  },
  {
      path: "/updateqna/:no",
      name: "updateqna",
      component: UpdateQNA,
      props:true
  },
  {
    path: "/addnotice",
    name: "addnotice",
    component: AddNotice
  },
  {
    path: "/noticeview/:no",
    name: "noticeview",
    component: NoticeView,
    props:true
  },
  {
    path: "/notice",
    name: "notice",
    component: Notice
  },
  {
    path: "/about",
    name: "about",
    component: About,
    props:true

  },
  {
    path: "/cart",
    name: "cart",
    component: Cart

  },
  {
    path: "/settingmain",
    name: "settingmain",
    component: SettingMain,
    children:[
      {
        path: "/settingmain/home",
        name: "settinghome",
        component: SettingHome
    
      },
      {
        path: "/settingmain/notice",
        name: "noticesetting",
        component: NoticeSetting
    
      },
      {
        path: "/settingmain/qna",
        name: "qnasetting",
        component: QNASetting
    
      },
      {
        path: "/settingmain/food",
        name: "foodsetting",
        component: FoodSetting
    
      },
      {
        path: "/settingmain/user",
        name: "usersetting",
        component: UserSetting
    
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
