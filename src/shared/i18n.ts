import type { App } from 'vue'
import { createGettext } from 'vue3-gettext'
import translations from '~src/../languages/translations.json'

/*
Examples:

import gettext from "./gettext"

const { $gettext } = gettext

const myTest = $gettext("My translation message")

// use in *.vue template: {{ $gettext("Message to translate") }}
*/

export default (app: App) => {
  const gettext = createGettext({
    availableLanguages: {
      en: 'English',
      vi: 'Vietnamese',
      'zh-CN': '中文'
    },
    defaultLanguage: 'en',
    translations,
  })

  app.use(gettext)
}
