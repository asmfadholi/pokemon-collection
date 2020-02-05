import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import './registerServiceWorker'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Styling
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './scss/index.scss'

// install plugin
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
