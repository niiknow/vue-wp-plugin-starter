# vue-wp-plugin-starter
Vue Wordpress Plugin Starter with Vue3, Typescript, and Laravel Mix (Webpack wrapper)

# to get started

Run:
```
bash init-plugin.sh
```

Use composer with `composer install` and `npm install` for Vue.

For limited local debug, run (also see package.json scripts):
```shell
npm run watch
```
Limited client-side demo: https://niiknow.github.io/vue-wp-plugin-starter/public/

To build `dist.zip` for deployment:
```shell
composer app:package
```

Deploy `dist.zip` to a wordpress website:
```shell
cd your-wp-site-root
cd wp-content/plugins
unzip dist.zip -d wp-your-plugin-folder-name
```

Also, don't forget to update readme.txt with your plugin details.

# Folder structures / Features

- **assets/** image, css, and sass/scss files
  * `sass` support but can easily convert to `postcss` for use with Tailwind CSS
- **config/** php type configuration file similar to laravel
- **includes/**  php source files
  * structural layout on how to: DB Migration, Admin pages, Frontend pages, WP_CLI setup, REST API, and Assets management.
- **languages/** translation files
- **public/** compiled script and static contents.  Support limited local test of compiled `vue` assets.
- **src/** typescript, javascript, and vue sources
  * using laravel-mix to support multiple admin or frontends `vue` app.  This support also translate inside of `includes/Frontend.php`
  * eslint for linting and formatting support
- **tests/** unit tests files
  * support both php (phpunit) and javascript (jest) unit testing
