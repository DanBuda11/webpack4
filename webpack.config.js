const webpack = require('webpack');
const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, arg) => {
  // Everything that's the same in dev and prod goes in this config variable

  let config = {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader:
                arg.mode === 'production'
                  ? MiniCssExtractPlugin.loader
                  : 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: arg.mode === 'development' ? true : false,
              },
            },
            { loader: 'postcss-loader' },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: arg.mode === 'development' ? true : false,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
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
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new BundleAnalyzerPlugin(),
    ],
  };

  // Stuff only used in dev
  if (arg.mode === 'development') {
    config.devtool = 'source-map';
    config.devServer = { hot: true };
    config.plugins.push(
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/',
      }),
      new webpack.HotModuleReplacementPlugin({})
    );
  }

  // Stuff only used in prod
  if (arg.mode === 'production') {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    };
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new CleanWebpackPlugin(['dist']),
      new CompressionPlugin({
        test: /\.(jsx?|html)$/,
        filename: '[path].gz[query]',
        algorithm: 'gzip',
      })
    );
  }

  return config;
};
