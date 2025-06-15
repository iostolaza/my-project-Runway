// webpack.config.js
const path    = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './js/contact-form.js',
  output: {
    filename: 'bundle.js',
    path:     path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      // this inlines the literal string into your bundle
      'process.env.API_ROOT': JSON.stringify(
        'https://projectrunway-api-175ac734850a.herokuapp.com'
      )
    })
  ]
};
