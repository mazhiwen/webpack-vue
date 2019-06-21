import _ from 'lodash';
import {
  utiDate,
} from 'utility-mar';
import 'styles';
import Vue from 'vue';
import {
  Provider,
} from 'react-redux';
import {
  createStore,
} from 'redux';
import {
  Route,
  Router,
} from 'react-router-dom';
import history from 'router/history';
import ReactDOM from 'react-dom';
import reducers from './reducers';
// 主应用app入口文件

import App from "./App.vue";
// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/" component={App} />
//     </Router>
//   </Provider>,
//   document.getElementById('root'),
// );

// var app = new Vue({
//   el: '#root',
//   data: {
//     message: 'Hello Vue!'
//   }
// })



new Vue({
  render: h => h(App),
}).$mount('#app')