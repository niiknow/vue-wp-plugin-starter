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
  * `css` post css file demo use with Tailwind CSS
  * `html` template file for local debug
- **config/** location containing php type configuration file similar to laravel
- **includes/** main php source location
  * structural layout on how to: DB Migration, Admin pages, Frontend pages, WP_CLI setup, REST API, and Assets management.
- **languages/** standard wordpress style translation files
- **public/** compiled script and static contents.  Support limited local test of compiled `vue` assets.
- **src/** typescript, javascript, and vue sources
  * using laravel-mix to support multiple admin and front-end `vue` apps.  This support also translate inside of `includes/FrontendLoader.php`
  * eslint for linting and formatting support
- **tests/** unit tests files
  * support both php (phpunit) and javascript (jest) unit testing

# Vue apps
There are two front-end apps in this starter/example.  Let say your prefix is `wp-awesome-plugin`, then your shortcodes would be (also see `include/FrontendLoader.php`):

```html
<!-- frontend app (full route) example -->
[wp-awesome-plugin-vue-app postfix='frontend']

<!-- frontview app (dynamic view) example, render component in frontview/views/Comp2.vue folder -->
[wp-awesome-plugin-vue-app postfix='frontview' view="Comp2"]
```

Since admin does not require shortcode, it is automatically generate with wrapper id=`admin-app-wrapper`
