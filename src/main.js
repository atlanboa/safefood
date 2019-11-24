import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import VModal from 'vue-js-modal'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC_iSYjUcj_d5Vfzwnn7akX7iYK_pciQg0',
    libraries: 'places'
  }
})



Vue.use(VModal, { dynamic: true })
Vue.use(VueSession)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
