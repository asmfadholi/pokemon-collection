import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import './registerServiceWorker'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueRandomColor from 'vue-randomcolor'
import VueSweetalert2 from 'vue-sweetalert2'
import VueAnalytics from 'vue-analytics'

// Styling
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import './scss/index.scss'

// install plugin
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRandomColor)
Vue.use(VueSweetalert2)
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_ANALYTICS,
  router
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
