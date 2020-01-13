import _ from 'lodash';

import 'styles';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  routes,
} from 'router';
import store from './store';
import components from 'components';
import filters from 'filters';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import App from './App.vue';


// dsa
import 'static/js/test.js';

Vue.use(VueRouter);
Vue.use(components);
Vue.use(filters);
Vue.use(ElementUI);


const router = new VueRouter({
  routes,
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
