import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import './registerServiceWorker'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRandomColor from 'vue-randomcolor'

// Styling
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './scss/index.scss'

// install plugin
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRandomColor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
