// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'

import {
  httpGet,
  httpPost,
  httpGet2,
  httpPost2,
  httpUpload
} from '@/utils/request'
import './permission' // permission control
Vue.prototype.$httpGet = httpGet,
  Vue.prototype.$httpPost = httpPost,
  Vue.prototype.$httpGet2 = httpGet2,
  Vue.prototype.$httpPost2 = httpPost2,
  Vue.prototype.$httpUpload= httpUpload

//import drawEcharts from '../src/assets/js/drawEcharts';

Vue.config.productionTip = false
Vue.use(ElementUI);
//Vue.use(drawEcharts);
// Vue.prototype.axios = axios
// Vue.prototype.$echarts = echarts





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
