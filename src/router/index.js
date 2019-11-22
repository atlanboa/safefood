import Vue from 'vue';
import VueRouter from 'vue-router';
import MainHeader from '../components/mainpage/MainPage.vue';

import FoodList from '../components/foodservice/FoodList.vue';
import FoodView from '../components/foodservice/FoodView.vue';
import SignUp from '../components/administrator/SignUp.vue';
import Login from '../components/administrator/Login.vue';
// import VAnimateCss from 'v-animate-css';

// Vue.use(VAnimateCss);
Vue.use(VueRouter)

const routes = [
  {
    path:"/mainpage",
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
    path: "/login",
    name: "login",
    component: Login,
    props:true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
