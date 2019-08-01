export default [
  // user
  // {
  //   path: '/user',
  //   component: '../layouts/UserLayout',
  //   routes: [
  //     { path: '/user', redirect: '/user/login' },
  //     { path: '/user/login', name: 'login', component: './User/Login' },
  //     { path: '/user/register', name: 'register', component: './User/Register' },
  //     {
  //       path: '/user/register-result',
  //       name: 'register.result',
  //       component: './User/RegisterResult',
  //     },
  //     {
  //       component: '404',
  //     },
  //   ],
  // },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // dashboard
      { path: '/', redirect: '/index' },
      {
        path: '/index',
        icon: 'home',
        name: 'dashboard',
        component: './Dashboard/View',
      },
      // pk
      {
        path: '/pk',
        icon: 'team',
        name: 'pk',
        routes: [
          {
            path: '/pk/userlist',
            name: 'userlist',
            component: './PK/UserList',
          },
          {
            path: '/pk/cardlist',
            name: 'cardlist',
            component: './PK/CardList',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
