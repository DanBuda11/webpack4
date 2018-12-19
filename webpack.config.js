// This will be the final config file that includes logic for using both dev and prod modes

// import stuff like webpack & path
const webpack = require('webpack');
const path = require('path');

// import plugins
// Inside this plugins const, only put in plugins used by both dev and prod modes, then .push() other plugins based on if you're in dev or prod mode:
// if (env.mode = dev) {
//plugins.push('dev plugins')
//}

// start main config code
module.exports = (env, argv) => {
  const plugins = [];

  console.log('env: ', env);
  console.log('argv: ', argv);

  return {
    // don't need entry
    output: {
      path: path.resolve(__dirname, 'dist'),
      // Consider removing the [name] part of this if it seems unnecessary. Keep the chunkhash because it will be good
      // code splitting for vendor files.
      filename: '[name].[chunkhash].bundle.js',
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
          use: [],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [],
        },
        {
          test: /\.svg$/,
          use: [],
        },
      ],
    },
    plugins,
  };
};
