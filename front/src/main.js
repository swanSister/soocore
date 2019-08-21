// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api/api'
import eventBus from './eventBus'
console.log(eventBus)
Vue.use(require('vue-moment'))
Vue.prototype.$eventBus = eventBus
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.use(api,{
  store
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
