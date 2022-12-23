import Vue from 'vue'
import App from './App'
import store from './store'
import tip from './common/util/tip.js'
import configService from './common/service/config.service.js'


import uView from "uview-ui";
Vue.use(uView);

// store
Vue.prototype.$store = store;
// tip
Vue.prototype.$tip = tip;
// config
Vue.prototype.$config = configService;

// request请求
import {
	http
} from '@/common/service/service.js'
Vue.prototype.$http = http

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
