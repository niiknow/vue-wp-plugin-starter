const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  externals: {
    'jquery': 'jQuery',
    'vue': 'Vue'
  },
  plugins: [
    new BundleAnalyzerPlugin(),
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
