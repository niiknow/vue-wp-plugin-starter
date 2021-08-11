# vue-wp-plugin-starter
Vue Wordpress Plugin Starter with Vue3, Typescript, and Laravel Mix (Webpack wrapper)

# to get started
* Decide your plugin `name`, `prefix`, and `namespace`; then search & replace all `Baseapp` namespace
** Remember to update `composer.json` and `package.json`
* Update **all appropriate values** in `vue-wp-plugin-starter.php` and rename with `YOUR_PLUGIN_NAME.php`
* Update `VERSION` and `PREFIX` constants in `includes/Main.php`

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

# folder structures

- **assets/** image, css, and sass files
- **includes/**  php stuff
- **languages/** translation files
- **public/** compiled script source and static contents
- **src/** typescript, javascript, and vue sources
