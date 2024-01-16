import type { App } from 'vue'
import debounce from 'lodash/debounce'
import installI18n from './i18n'
import swal from 'sweetalert2'

export default (app: App, configName: string) => {
  installI18n(app)
  const win: any = window

  win.$appConfig = {}
  win.$appConfig.debounce = debounce

  app.config.globalProperties.$win  = win
  app.config.globalProperties.$swal = swal
  app.provide('win', win)
  app.provide('pluginConfig', win[configName] )
}
