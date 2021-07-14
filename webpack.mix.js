const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

const postcssPlugins = [
  require('postcss-import'),
  require('autoprefixer'),
];

mix.setPublicPath('public/');

mix.ts('src/admin/admin.ts', 'js')
 .vue({
    version: 3,
    // extractStyles: true,
    // globalStyles: false
  })
 .sourceMaps();
mix.ts('src/frontend/frontend.ts', 'js')
 .vue({
    version: 3,
    // extractStyles: true,
    // globalStyles: false
  })
 .sourceMaps();


mix.postCss(
    'assets/admin.css',
    'css',
    postcssPlugins
  )
  .postCss(
    'assets/frontend.css',
    'css',
    postcssPlugins
  )
  .webpackConfig(require('./webpack.config'));

if (mix.inProduction()) {
  mix.version().sourceMaps();
}

mix.browserSync({
  serveStatic: ['./public'],
  serveStaticOptions: {
    extensions: ['html'] // pretty urls
  }
})

