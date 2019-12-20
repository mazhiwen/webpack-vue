export default [
  {
    path: '/home',
    // exact: true,
    component: resolve => require(['views/home'], resolve),
  },
]