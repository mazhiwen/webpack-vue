

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
]