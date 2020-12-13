import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.scss'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'wss://ws.blockchain.info/inv', {
  connectManually: true,
  format: 'json',
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
