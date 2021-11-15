export default [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: '@/pages/Login',
  },
  {
    path: '/home',
    component: '@/pages/Home',
  },
  {
    path: '/blog',
    component: '@/layouts',
    routes: [
      {
        path: '/blog/article',
        component: '@/pages/article',
      },
      {
        path: '/blog/article/list',
        component: '@/pages/ArticleList',
      },

      {
        path: '/blog/user',
        component: '@/pages/User',
      },
    ],
  },
];
