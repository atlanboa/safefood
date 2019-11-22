import Vue from 'vue'
import VueRouter from 'vue-router'
import MainHeader from '../components/mainpage/MainPage.vue'

import FoodList from '../components/foodservice/FoodList.vue'
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
