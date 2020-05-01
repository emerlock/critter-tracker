import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Critter Tracker',
    },
  },
  {
    path: '/critters-leaving',
    name: 'Critters Leaving',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'Critter Tracker',
    },
  },
  {
    path: '/critters-active',
    name: 'Critters Active',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Active.vue'),
    meta: {
      title: 'Critter Tracker',
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
