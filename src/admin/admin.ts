import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerScrollSpy } from 'vue3-scroll-spy'
import { variantJS, VariantJSConfiguration } from '@variantjs/vue'
import installShared from '~src/shared'

const app = createApp(App)

app.use(router)
registerScrollSpy(app)

const configuration: VariantJSConfiguration = {
  TButton: {
    fixedClasses: 'block px-4 py-2 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
    classes: 'text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600',
    variants: {
      secondary: {
        classes: 'text-gray-800 bg-white border border-gray-300 shadow-sm rounded hover:text-gray-600'
      },
      error: {
        classes: 'text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600'
      },
      success:{
        classes: 'text-white bg-green-500 border border-transparent rounded shadow-sm hover:bg-green-600'
      },
      link: {
        classes: 'text-blue-500 underline hover:text-blue-600'
      }
    },
  },
}

app.use(variantJS, configuration)

// delay mount so we can load configuration
setTimeout(() => {
  installShared(app, 'vue_wp_plugin_config_admin')
  app.mount('#vue-admin-app')
}, 200)
