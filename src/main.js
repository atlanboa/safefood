import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import VModal from 'vue-js-modal'


Vue.use(VModal, { dynamic: true })
Vue.use(VueSession);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
