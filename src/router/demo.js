

export default [
  {
    path: '/demo',
    name: 'demo',
    meta: {
      title: 'demo',
    },
    component: () => import('views/demo'),
    children: [
      {
        path: 'demoa',
        name: 'demo.demoa',
        meta: {
          title: 'demoa',
        },
        component: () => import('views/demo/demoa'),
      },

    ],
  },
];
