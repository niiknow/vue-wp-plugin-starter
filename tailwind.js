module.exports = {
  // allow PurgeCSS to analyze components
  content: [
    './public/index.html',
    './public/admin.html',
    './public/frontend.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './assets/*.{css,scss}',
    './node_modules/@variantjs/core/src/config/**/*.ts'
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
//  prefix: 'PluginPrefix-', //to prevent overlapping styles from WP
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
