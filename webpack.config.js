// This will be the final config file that includes logic for using both dev and prod modes

// import stuff like webpack & path

// import plugins

// start main config code
module.exports = {
  // don't need entry
  output: {},
  module: {
    rules: [
      {
        test: /\.js$/,
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
  plugins: [],
};
