import Home from 'views/home';
// import Blacklist from 'views/blacklist';
// import BlacklistList from 'views/blacklist/list';
// import BlacklistAdd from 'views/blacklist/add';


const routes = [{
  path: '/home',
  // exact: true,
  component: resolve => require(['views/home'], resolve),
},
  // {
  //   path: '/home',
  //   component: Home,
  // },
  // {
  //   path: '/blacklist',
  //   component: Blacklist,
  //   auth:false,
  //   routes: [
  //     {
  //       path: '/blacklist/list',
  //       auth:true,
  //       exact:true,
  //       component:BlacklistList
  //     },
  //     {
  //       path: '/blacklist/add/:id',
  //       exact:true,
  //       component:BlacklistAdd
  //     },
  //     {
  //       path: '/blacklist/add',
  //       exact:true,
  //       component:BlacklistAdd
  //     }
  //   ]
  // }


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
