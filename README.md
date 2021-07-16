# vue-wp-plugin-starter
Vue Wordpress Plugin Starter with Vue3, Typescript, and Laravel Mix (Webpack wrapper)

# To get started
1. Decide on YOUR_PLUGIN_NAME and namespace and replace all `Baseapp` namespace
2. Update **all appropriate values** in ``vue-wp-plugin-starter.php` and rename with YOUR_PLUGIN_NAME.php
3. Update VERSION and PREFIX constants in `includes/Main.php`

Use composer with `composer install` and `npm install` for Vue.

For limited local debug, run (also see package.json scripts):
```shell
npm run watch
```

To build `dist.zip` for deployment:
```shell
composer app:package
```

Also, don't forget to update readme.txt with your plugin details.

# Folders

- **assets/** image, css, and sass files
- **includes/**  php stuff
- **languages/** translation files
- **public/** compiled script source and static contents
- **src/** typescript, javascript, and vue sources
