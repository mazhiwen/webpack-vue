

export default [
  {
    path: '/demo',
    name: 'demo',
    meta: {
      title: 'demo'
    },
    component: () => import('views/demo'),
    children: [
      {
        path: 'demoa',
        name: 'demo.demoa',
        meta: {
          title: 'demoa'
        },
        component: () => import('views/demo/demoa'),
      },
      {
        path: 'table',
        name: 'demo.table',
        meta: {
          title: 'table'
        },
        component: () => import('views/demo/table'),
      }, {
        path: 'carousel',
        name: 'demo.carousel',
        meta: {
          title: 'carousel'
        },
        component: () => import('views/demo/carousel'),
      },{
        path: 'svg',
        name: 'demo.svg',
        meta: {
          title: 'svg'
        },
        component: () => import('views/demo/svg'),
      },
       
    ]
  },
]