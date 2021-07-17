import axios from './axios'

export default function(win: any) {
  win.$appConfig = win.vue_wp_plugin_config || {}
  win.$appConfig.axios = axios

  return win
}
