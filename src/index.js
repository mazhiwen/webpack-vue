import _ from 'lodash';
import {
  utiDate,
} from 'utility-mar';
import 'styles';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  routes,
} from 'router';
import store from './store';


import App from './App.vue';

Vue.use(VueRouter);


const router = new VueRouter({
  // mode: 'history',
  routes, // (缩写) 相当于 routes: routes
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
