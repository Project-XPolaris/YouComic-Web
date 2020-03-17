import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path:"/user/login",
      component: "../pages/user/login/index"
    },
    {
      path: '/',
      component: '../layouts/index',
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
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'web',
      dll: true,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
};

export default config;
