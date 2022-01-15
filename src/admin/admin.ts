import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import VueAxios from 'vue-axios'
import config from '@/shared/config'
import { registerScrollSpy } from 'vue3-scroll-spy'
//import { variantJS, VariantJSConfiguration } from '@variantjs/vue'

// @ts-ignore
const win: any = config(window)
const app = createApp(App)

// Using default options
registerScrollSpy(app)

// allow for using this.$win/axios inside of a component
app.config.globalProperties.$win  = win;
app.config.globalProperties.axios = win.$appConfig.axios

app.use(router)
  .use(VueAxios, win.$appConfig.axios)

// const configuration: VariantJSConfiguration = {}

//app.use(variantJS, configuration)

app.mount('#vue-admin-app')
