import echart from './echart';
import demo from './demo';
import extra from './extra';


const routes = [
  {
    path: '*',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login'),
  },
  ...echart,
  ...demo,
  ...extra,
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
