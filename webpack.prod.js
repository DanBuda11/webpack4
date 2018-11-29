const webpack = require('webpack');
const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?&/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.html&/,
        use: [],
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  devtool: false,
  target: 'web',
  serve: {
    port: 3333,
    content: './dist',
  },
  devServer: {
    compress: true,
    hot: true,
  },
  plugins: [
    new CompressionPlugin({
      test: /\.(jsx?|html)/,
      filename: '[path].gz[query]',
      algorithm: 'gzip',
    }),
    new webpack.SourceMapDevToolPlugin({}),
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
