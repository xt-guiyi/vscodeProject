const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: __dirname,
    filename: 'dist/bound.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'assets/index.html')
    })
  ],
  devServer: {
    open: true,
    port: 9999,
    contentBase: path.join(__dirname, 'dist')
  },
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      }
    }
  ]
}