const webpack = require('webpack');
const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  // mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    // Public path causing errors for some reason when running npm run build but doesn't seem to screw anything up in dev mode
    // publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
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
              outputPath: 'images',
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
  devtool: false,
  target: 'web',
  serve: {
    port: 3333,
    content: './dist',
  },
  devServer: {
    contentBase: './src',
    compress: true,
    hot: true,
    open: true,
  },
  plugins: [
    new CompressionPlugin({
      test: /\.(jsx?|html)$/,
      filename: '[path].gz[query]',
      algorithm: 'gzip',
    }),
    // new webpack.SourceMapDevToolPlugin({}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(['dist']),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new UglifyJsPlugin()],
  },
};
