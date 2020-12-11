import Vue from 'vue'
import Vuex from 'vuex'
import desktop from './desktop'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    desktop
  },
  plugins: [vuexLocal.plugin],
})
