import Vue from 'vue'
import Vuex from 'vuex'
import { sectors } from '@/stores/sectors.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: "api.whatever.com"
  },
  mutations: {

  },
  actions: {

  },
  modules: {
      sectors,
      admin
  }
})
