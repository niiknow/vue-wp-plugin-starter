const fs = require('fs')
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
  watchOptions: {
    ignored: ['**/public/admin.html','**/public/frontend.html', '**/node_modules']
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

mix.version()

if (mix.inProduction()) {
  mix.sourceMaps()
}

mix.after(() => {
  let manifest = JSON.parse(
    fs.readFileSync('./public/mix-manifest.json').toString()
  )

  let adminHtml    = fs.readFileSync('./public/admin-tpl.html').toString()
  let frontendHtml = fs.readFileSync('./public/frontend-tpl.html').toString()
  for (let path of Object.keys(manifest)) {
    adminHtml    = adminHtml.replace(path.replace(/^\//, ''), manifest[path].replace(/^\//, ''))
    frontendHtml = frontendHtml.replace(path.replace(/^\//, ''), manifest[path].replace(/^\//, ''))
  }

  fs.writeFileSync('./public/admin.html', adminHtml.replace(/\/\//i, '/'))
  fs.writeFileSync('./public/frontend.html', frontendHtml.replace(/\/\//i, '/'))
});

mix.webpackConfig(webpackConfig)
  .browserSync({
    serveStatic: ['./public'],
    serveStaticOptions: {
      extensions: ['html'] // don't need to provide html extension, this create pretty urls
    }
  });

