

export default [
  {
    path: '/table',
    name: 'table',
    // exact: true,
    component: () => import('views/table'),
  },
  {
    path: '/carousel',
    name: 'carousel',
    // exact: true,
    component: () => import('views/carousel'),
  },
  {
    path: '/svg',
    name: 'svg',
    component: () => import('views/svg'),
  },
  {
    path: '/echartrelation',
    name: 'echartrelation',
    component: () => import('views/echartrelation'),
  }, {
    path: '/echartline',
    name: 'echartline',
    component: () => import('views/echartline'),
  },
]