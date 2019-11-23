import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSession from 'vue-session'
import VModal from 'vue-js-modal'
import * as VueGoogleMaps from 'vue2-google-maps'

import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC_iSYjUcj_d5Vfzwnn7akX7iYK_pciQg0',
    libraries: 'places'
  }
})
Vue.use(VModal, { dynamic: true })
Vue.use(VueSession)

Vue.config.productionTip = false
Vue.use(Vuetify);

Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
