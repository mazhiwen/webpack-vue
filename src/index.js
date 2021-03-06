import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'static/js';
import 'styles';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  routes,
} from 'router';
import components from 'components';
import filters from 'filters';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import MARUI from 'vue-ui-mar';
// import VueEditorMar from 'vue-editor-mar';

import store from './store';
import App from './App.vue';
import 'vue-editor-mar/lib/theme-chalk/index.css';
import { test, testfn } from 'static/SYSOUTCONFIG';

console.log(test);
Vue.use(VueRouter);
Vue.use(components);
Vue.use(filters);
Vue.use(ElementUI);
// console.log(MARUI);

// Vue.use(MARUI);
// Vue.use(VueEditorMar);
const router = new VueRouter({
  mode: 'history',
  // base: '/base/',
  base: '/',
  routes,
});


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');


/************************  treeshaking ************/
// import { cube } from 'utils/treeshaking'
// cube(123322)



/****** 测试class */
// class classFoo{
//   constructor(x) {
//       this.x = x;
//   }
// }
// var aclassfoo = new classFoo(2);
