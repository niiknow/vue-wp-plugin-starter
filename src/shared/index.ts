import type { App } from 'vue'
import axios from 'axios'
import debounce from 'lodash/debounce'
import installI18n from './i18n'
import VueAxios from 'vue-axios'
import swal from 'sweetalert2'

export default (app: App) => {
  installI18n(app)
  const win: any = window

  win.$appConfig = {}
  win.$appConfig.axios = axios
  win.$appConfig.debounce = debounce

  // allow for using this.$win/axios inside of a component
  app.config.globalProperties.$win  = win;
  app.config.globalProperties.axios = win.$appConfig.axios
  app.config.globalProperties.$swal = swal
  app.use(VueAxios, win.$appConfig.axios)
}
