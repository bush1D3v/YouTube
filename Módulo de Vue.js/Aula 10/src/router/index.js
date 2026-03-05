import { createRouter, createWebHistory } from 'vue-router'
import IfsView from '../views/IfsView.vue'

const routes = [
  { path: '/', component: IfsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
