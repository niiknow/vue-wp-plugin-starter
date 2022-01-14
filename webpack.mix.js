const mix = require('laravel-mix');
const path = require('path')
const webpack = require('webpack')

const webpackConfig = {
  externals: {
    'jquery': 'jQuery',
    'vue': 'Vue'
  },
  plugins: [
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

mix.ts('src/admin/admin.ts', 'js')
  .vue({
    version: 3,
    extractStyles: true
  });

mix.ts('src/frontend/frontend.ts', 'js')
  .vue({
    version: 3,
    extractStyles: true
  });

// bare minimum packages: ['core-js', 'vue-router', '@vue/devtools-api']
mix.extract(); // empty to extract all

const postcssPlugins = [
  require('tailwindcss')('./tailwind.config.js'),
  require('autoprefixer'),
  require('postcss-import'),
  require('postcss-pxtorem')({
    propList: ['*'],
    selectorBlackList: ['border'],
    mediaQuery: true,
  })
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

if (mix.inProduction()) {
  mix.version().sourceMaps();
}

mix.webpackConfig(webpackConfig)
  .browserSync({
    serveStatic: ['./public'],
    serveStaticOptions: {
      extensions: ['html'] // don't need to provide html extension, this create pretty urls
    }
  });

