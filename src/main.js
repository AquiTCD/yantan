import Vue from 'vue'
import App from './App'
import router from './router'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
Vue.use(KeenUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el    : '#app',
  router,
  render: (h) => h(App),
})
