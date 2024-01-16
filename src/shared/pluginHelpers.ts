import { inject } from 'vue'

export function getPluginUrl() {
  // @ts-ignore
  return inject('pluginConfig', {}).pluginUrl || ''
}
