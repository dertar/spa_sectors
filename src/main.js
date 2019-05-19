import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from 'buefy'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
