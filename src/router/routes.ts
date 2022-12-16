import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'profile',
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        path: 'data',
        component: () => import('src/pages/Data/DataPage.vue'),
        children: [
          {
            path: 'portfolio',
            component: import('src/pages/Data/PortfolioData.vue'),
          },
          {
            path: 'kimble-engagements',
            component: import('src/pages/Data/KimbleData.vue'),
          },
          { path: 'state', component: import('src/pages/Data/StateData.vue') },
        ],
      },
      { path: 'projects', component: () => import('pages/ProjectsPage.vue') },
      { path: 'project', component: () => import('pages/ProjectPage.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/sign-in',
    component: () => import('pages/SignInPage.vue'),
    meta: { requiresAuth: false },
  },
  // {
  //   path: 'data',
  //   component: () => import('src/pages/Data/Data.vue'),
  //   children: [
  //     {
  //       path: 'portfolio',
  //       component: import('src/pages/Data/PortfolioData.vue'),
  //     },
  //     {
  //       path: 'kimble-engagements',
  //       component: import('src/pages/Data/KimbleData.vue'),
  //     },
  //     { path: 'state', component: import('src/pages/Data/StateData.vue') },
  //   ],
  // },
  // { path: '/projects', component: () => import('pages/Projects.vue') },
  // {
  //   path: 'kimble-engagements',
  //   component: () => import('pages/KimbleEngagements.vue'),
  // },
  // { path: 'mapper', component: () => import('pages/Mapper.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
