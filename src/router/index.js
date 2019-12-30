import home from './home';
// import Blacklist from 'views/blacklist';
// import BlacklistList from 'views/blacklist/list';
// import BlacklistAdd from 'views/blacklist/add';


const routes = [
  ...home,
  {
    path: '/echartrelation',
    component: resolve => require(['views/echartrelation'], resolve),
  },
  {
    path: '/echartline',
    component: resolve => require(['views/echartline'], resolve),
  },
  {
    path: '/svg',
    component: () => import('views/svg'),
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
