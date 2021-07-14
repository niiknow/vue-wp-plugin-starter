import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '@/admin/views/Dashboard.vue'
import Settings from '@/admin/views/Settings.vue'

const routes: RouteRecordRaw[] = [
  { path: "/", component: Dashboard },
  { path: "/settings", component: Settings }
]

const router = createRouter({ history: createWebHashHistory(), routes })

export default router
