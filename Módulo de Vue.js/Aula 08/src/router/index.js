import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import VForView from '../views/VForView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/v-for', name: 'v-for', component: VForView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
