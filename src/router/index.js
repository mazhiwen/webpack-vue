import home from './home';
import single from './single';


const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  ...home,
  ...single,
  
  
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
