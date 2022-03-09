import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/info',
    name: 'info',
    // route level code-splitting
    // this generates a separate chunk (info.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "info" */ '../views/InfoView.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    // route level code-splitting
    // this generates a separate chunk (info.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "info" */ '../views/EditView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router