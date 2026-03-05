import { createRouter, createWebHistory } from 'vue-router'
import OnMountedView from '../views/OnMountedView.vue'
import OnUnmountedView from '../views/OnUnmountedView.vue'
import OnUpdatedView from '../views/OnUpdatedView.vue'

const routes = [
  { path: '/', redirect: '/on-mounted' },
  { path: '/on-mounted', component: OnMountedView },
  { path: '/on-unmounted', component: OnUnmountedView },
  { path: '/on-updated', component: OnUpdatedView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
