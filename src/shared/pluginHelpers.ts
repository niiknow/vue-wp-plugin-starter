import { inject } from 'vue'

export function getPluginUrl() {
  // @ts-ignore
  const pluginConfig: any = inject('pluginConfig', {})

  return pluginConfig.pluginUrl || ''
}
