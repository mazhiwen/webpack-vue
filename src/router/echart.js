

export default [
  {
    path: '/echart',
    name: 'echart',
    meta: {
      title: 'echart'
    },
    component: () => import('views/echart'),
    children: [
      {
        path: 'relation',
        name: 'echart.relation',
        meta: {
          title: 'relation'
        },
        component: () => import('views/echart/relation'),
      }, {
        path: 'line',
        name: 'echart.line',
        meta: {
          title: 'line'
        },
        component: () => import('views/echart/line'),
      },
    ]
  },
]