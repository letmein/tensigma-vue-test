import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Desktop' },
  },
  {
    path: '/desktop',
    name: 'Desktop',
    component: () => import(/* webpackChunkName: "desktop" */ '../views/Desktop.vue')
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import(/* webpackChunkName: "transactions" */ '../views/Transactions.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
