import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import VueAxios from 'vue-axios'
import config from '@/shared/config'

// @ts-ignore
const win: any = config(window)
const app = createApp(App)

// allow for using this.$win inside of a component
app.config.globalProperties.$win = win;

app.use(router)
  .use(VueAxios, win.$appConfig.axios);

app.mount('#vue-admin-app')
