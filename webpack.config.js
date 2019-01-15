const webpack = require('webpack');
const path = require('path');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, arg) => {
  // Everything that's the same in dev and prod goes in this config variable
  let config = {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: arg.mode === 'production' ? '[name].[chunkhash].js' : '[name].[hash].js',
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
                importLoaders: 2,
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
                name: '[hash:8].[ext]',
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
                name: '[hash:8].[ext]',
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
    ],
  };

  // Stuff only used in dev
  if (arg.mode === 'development') {
    config.devtool = 'eval-source-map';
    config.devServer = {
      contentBase: path.join(__dirname, 'src'),
      compress: true,
      hot: true,
    };
    config.plugins.push(
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 3000,
          proxy: 'http://localhost:8080/',
        },
        { reload: false }
      ),
      new BundleAnalyzerPlugin(),
      new webpack.HotModuleReplacementPlugin({})
    );
  }

  // Stuff only used in prod
  if (arg.mode === 'production') {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimizer: [
        new UglifyjsWebpackPlugin({
          uglifyOptions: {
            output: {
              comments: false,
            },
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    };
    config.plugins.push(
      new MiniCssExtractPlugin({}),
      new CleanWebpackPlugin(['dist']),
      new CompressionWebpackPlugin({
        test: /\.(jsx?|html)$/,
      }),
      new OptimizeCssAssetsPlugin({})
    );
  }

  return config;
};
