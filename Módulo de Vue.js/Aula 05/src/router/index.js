import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import VIfView from '../views/VIfView.vue'
import VShowView from '../views/VShowView.vue'
import VForView from '../views/VForView.vue'
import VBindView from '../views/VBindView.vue'
import VModelView from '../views/VModelView.vue'
import VOnView from '../views/VOnView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/v-if', name: 'v-if', component: VIfView },
    { path: '/v-show', name: 'v-show', component: VShowView },
    { path: '/v-for', name: 'v-for', component: VForView },
    { path: '/v-bind', name: 'v-bind', component: VBindView },
    { path: '/v-model', name: 'v-model', component: VModelView },
    { path: '/v-on', name: 'v-on', component: VOnView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
