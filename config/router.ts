export default [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: '@/pages/Login',
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
        path: '/blog/home',
        component: '@/pages/Home',
      },
      {
        path: '/blog/user',
        component: '@/pages/User',
      },
    ],
  },
];
