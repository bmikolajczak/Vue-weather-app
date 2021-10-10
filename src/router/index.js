import { createRouter, createWebHashHistory } from 'vue-router';

const Search = () => import('@/components/Search.vue');
const Weather = () => import('@/components/Weather.vue');
const routes = [
  {
    path: '/',
    component: Search,
    name: 'search',
  },
  {
    path: '/weather',
    component: Weather,
    name: 'weather',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
