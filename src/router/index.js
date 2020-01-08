import home from './home';
import single from './single';


const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  ...home,
  ...single,
  {
    path: '/echartrelation',
    component: resolve => require(['views/echartrelation'], resolve),
  },
  {
    path: '/echartline',
    component: resolve => require(['views/echartline'], resolve),
  },
  
];


const routesUrlMap = {};

function getRoutesUrlMap() {
  routes.map((value, index) => {
    //
    if (value.routes) {
      getRoutesUrlMap(value.routes);
    } else {
      routesUrlMap[value.path] = value;
    }
  });
}
getRoutesUrlMap();


export {
  routes,
  routesUrlMap,
};
