import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installShared from '~src/shared'

const app = createApp(App)
app.use(router)

// delay mount so we can load configuration
setTimeout(() => {
  installShared(app, 'vue_wp_plugin_config_frontend')
  app.mount('#vue-frontend-app')
}, 200)
