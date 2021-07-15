const mix = require('laravel-mix');
const path = require('path')
const webpack = require('webpack')

const webpackConfig = {
  externals: {
    'jquery': 'jQuery',
    'vue': 'Vue'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue', '.sass', '.scss', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    port: 31337   // in case your port 8080 and 31337 are taken, replace this
  }
}

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
mix.setPublicPath('public/');

mix.ts('src/admin/admin.ts', 'js/')
 .vue({
    version: 3,
    // extractStyles: true,
    // globalStyles: false
  });

mix.ts('src/frontend/frontend.ts', 'js/')
 .vue({
    version: 3,
    // extractStyles: true,
    // globalStyles: false
  });

mix.sass('assets/admin.scss', 'css/')
   .sass('assets/frontend.scss', 'css/');

/*

const postcssPlugins = [
  require('postcss-import'),
  require('autoprefixer'),
];

mix.options({
    postCss: postcssPlugins
  })
  .postCss(
    'assets/admin.css',
    'css'
  )
  .postCss(
    'assets/frontend.css',
    'css'
  )
*/

if (mix.inProduction()) {
  mix.version().sourceMaps();
}

mix.webpackConfig(webpackConfig)
   .browserSync({
      serveStatic: ['./public'],
      serveStaticOptions: {
        extensions: ['html'] // pretty urls
      }
   });

