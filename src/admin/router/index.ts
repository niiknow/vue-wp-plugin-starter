import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '~src/admin/views/Dashboard.vue'
import Settings from '~src/admin/views/Settings.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Dashboard },
  { path: '/settings', component: Settings }
]

const router = createRouter({ history: createWebHashHistory(), routes })

export default router
