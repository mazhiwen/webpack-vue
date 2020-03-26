import _ from 'lodash';
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
import MARUI from 'vue-ui-mar';
import store from './store';
import App from './App.vue';


Vue.use(VueRouter);
Vue.use(components);
Vue.use(filters);
Vue.use(ElementUI);
console.log(MARUI);

Vue.use(MARUI);

const router = new VueRouter({
  routes,
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
