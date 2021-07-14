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
  .webpackConfig(webpackConfig);

if (mix.inProduction()) {
  mix.version().sourceMaps();
}

mix.browserSync({
  serveStatic: ['./public'],
  serveStaticOptions: {
    extensions: ['html'] // pretty urls
  }
})

