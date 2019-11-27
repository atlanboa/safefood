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
import { faEnvelope, faUser, faCog,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitter , faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add the specific imported icons
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
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})
Vue.use(VModal, { dynamic: true })
Vue.use(VueSession);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
