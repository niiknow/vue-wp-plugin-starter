# vue-wp-plugin-starter
Vue Wordpress Plugin Starter with Vue3, Typescript, and Laravel Mix (Webpack wrapper)

# to get started
1. Decide your plugin `name` and `namespace`
    * `name` to update package.json `name` property
    * `namespace` this is to rename `Baseapp` and can also becomes your `PREFIX` (application domain) in `includes/Main.php`
2. Search & replace all `Baseapp` namespace (case-sensitive) to your new namespace. Also update all lowercase `baseapp` as your application domain.
    * Remember to update `composer.json`, `readme.txt`, and `package.json` with appropriate values.
3. Rename `vue-wp-plugin-starter.php` to your plugin filename.  Update **all appropriate values** in your new file.

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
  *
- **tests/** unit tests files
  * support both php (phpunit) and javascript (jest) unit testing
