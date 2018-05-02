
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
    ],
  },
  {
    path: '/users',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/users') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/standalone'),
    children: [
      { path: '', component: () => import('pages/login') },
    ],
  },
  {
    path: '/Success',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/success') },
    ],
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404'),
  },
];
