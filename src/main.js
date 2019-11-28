/*
  Version 1.6.0 by 금오공과대학교 김상헌, 대구대학교 전재욱
  2019.11.27 
*/


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import VModal from 'vue-js-modal'
import * as VueGoogleMaps from 'vue2-google-maps'
import HighchartsVue from "highcharts-vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faUser, faCog,faTrashAlt,faPenFancy} from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitter , faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add the specific imported icons
library.add(faPenFancy)
library.add(faEnvelope)
library.add(faUser)
library.add(faCog)
library.add(faFacebookSquare)
library.add(faTwitter)
library.add(faYoutube)
library.add(faInstagram)
library.add(faTrashAlt)

// Enable the FontAwesomeIcon component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$EventBus = new Vue();
Vue.use(HighchartsVue, { tagName: "charts" });
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC_iSYjUcj_d5Vfzwnn7akX7iYK_pciQg0',
    libraries: 'places', 
  },
})
Vue.use(VModal, { dynamic: true })
Vue.use(VueSession);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
