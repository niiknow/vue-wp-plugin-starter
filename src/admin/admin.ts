import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import VueAxios from 'vue-axios'
import config from '@/shared/config'

// @ts-ignore
// import masonry from 'vue-next-masonry'
const win: any = config(window)
const app = createApp(App)

app.use(router)
  .use(VueAxios, win.$appConfig.axios);

app.config.globalProperties.$axios = win.$appConfig.axios;
app.mount('#vue-admin-app')
