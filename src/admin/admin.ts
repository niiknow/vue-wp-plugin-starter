import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import '@/shared/index'

const app = createApp(App)
app.use(router)
app.mount('#vue-admin-app')
