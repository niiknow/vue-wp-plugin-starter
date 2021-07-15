import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import '@/shared/index'

// @ts-ignore
import masonry from 'vue-next-masonry'

const app = createApp(App)
app.use(router)
   .use(masonry)
   .mount('#vue-admin-app')
