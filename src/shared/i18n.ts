import type { App } from 'vue'
import { createGettext } from 'vue3-gettext';
import { createApp } from 'vue';
import translations from '@src/../languages/translations.json';

/*
Examples:

import gettext from "./gettext";

const { $gettext } = gettext;

const myTest = $gettext("My translation message");
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
  });

  app.use(gettext)
}
