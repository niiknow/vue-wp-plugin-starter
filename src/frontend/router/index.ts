import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '~src/frontend/views/Home.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home }
]

const router = createRouter({ history: createWebHashHistory(), routes })

export default router
