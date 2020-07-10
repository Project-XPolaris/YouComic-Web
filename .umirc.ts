export default {
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  history: { type: 'hash' },
  publicPath: './',
  routes: [
    {
      path: '/user/login',
      component: '../pages/user/login/index',
    },
    {
      path: '/',
      component: '../layouts/AuthorityLayout/index',
      routes: [
        { path: '/', component: '../pages/home/index' },
        { path: '/books', component: '../pages/book/list/index' },
        { path: '/book/:id', component: '../pages/book/detail/index' },
        { path: '/book/:id/read', component: '../pages/book/read/index' },
        { path: '/my/collections', component: '../pages/collection/list/index' },
        { path: '/collection/:name', component: '../pages/collection/detail/index' },
        { path: '/tag/:id', component: '../pages/tag/detail/index' },
        { path: '/search/:id', component: '../pages/search/index' },
        { path: '/search/:id/books', component: '../pages/search/books/index' },
        { path: '/search/:id/tags', component: '../pages/search/tags/index' },
        { path: '/search/:id/collections', component: '../pages/search/collections/index' },
      ],
    },
  ],
};
