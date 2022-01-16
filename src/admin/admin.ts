import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import VueAxios from 'vue-axios'
import config from '@/shared/config'
import { registerScrollSpy } from 'vue3-scroll-spy'
import { variantJS, VariantJSConfiguration } from '@variantjs/vue'
import swal from 'sweetalert2'

// @ts-ignore
const win: any = config(window)
const app = createApp(App)

// Using default options
registerScrollSpy(app)

// allow for using this.$win/axios inside of a component
app.config.globalProperties.$win  = win;
app.config.globalProperties.axios = win.$appConfig.axios
app.config.globalProperties.$swal = swal

app.use(router)
  .use(VueAxios, win.$appConfig.axios)

const configuration: VariantJSConfiguration = {
  TButton: {
    fixedClasses: "block px-4 py-2 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
    classes: "text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600",
    variants: {
      secondary: {
        classes: "text-gray-800 bg-white border border-gray-300 shadow-sm rounded hover:text-gray-600"
      },
      error: {
        classes: "text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600"
      },
      success:{
        classes: "text-white bg-green-500 border border-transparent rounded shadow-sm hover:bg-green-600"
      },
      link: {
        classes: "text-blue-500 underline hover:text-blue-600"
      }
    },
  },
}

app.use(variantJS, configuration)

app.mount('#vue-admin-app')
