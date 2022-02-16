import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

// import i18n resources
import en from '@src/../languages/en.json'
import zhCN from '@src/../languages/zh-CN.json'
import vi from '@src/../languages/vi.json'

export default (app: App) => {
  const i18n = createI18n({
    locale: 'en',
    messages: {
      en,
      'zh-CN': zhCN,
      vi
    }
  })

  app.use(i18n)
}
