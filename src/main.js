// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import qs from 'qs' 
Vue.prototype.$http = Axios


Axios.defaults.baseURL = 'http://api.alcp66.com';
// Axios.interceptors.response.use(response => {
//   if (response.data.msg=='4001') {
//     sessionStorage.removeItem('im_token');
//     // location.href='/';
//   }
//   return response
// }, error => {
//   return Promise.resolve(error)
// })

Vue.config.productionTip = false
Vue.prototype.$http = Axios

Vue.use(iview)
Vue.use(ElementUI)
Vue.use(qs)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
