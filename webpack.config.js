const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  // Don't need an entry, it defaults to ./src/index.js
  // entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/',
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
      // {
      //   test: /\.html&/,
      //   use: [],
      // },
      {
        test: /\.scss$/,

        use: [
          {
            loader:
              process.env.NODE_ENV === 'production'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            // url-loader doesn't work with svg
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 8192,
              outputPath: 'images/',
              name: '[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
      {
        // haven't tested svg to see if it works
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              name: '[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
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
    new webpack.HotModuleReplacementPlugin({}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
