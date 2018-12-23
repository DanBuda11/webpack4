# Webpack 4 + Babel 7 + React 16 Framework

Need to start over with a new new webpack.config.js and set it up as a function, mostly empty, and set all the prod vs. dev stuff up (the logic) first, then add just enough to test to see if running npm start vs npm run build are working correctly (as in, are the correct loaders & plugins being used in prod vs dev based on the logic set up in the config file)

### Need to do:

- List of which plugins/loaders go with dev/prod
- use optimization splitChunks instead of CommonChunksPlugin
- Best way to put in suite of favicons? HtmlWebpackPlugin says it can automatically inject manifest and favicons in addition to css & js
- `production` is the default mode for webpack so keep that in mind when developing "if-then" type stuff in the config file
- for function-type config file (which I'm doing), 1st argument (env) is env and 2nd (arg) describes the options passed to webpack
  - So for something like devtool, instead of how I'm currently adding it to dev mode, I could write:
  - ```javascript
    devtool: arg.mode === 'development' ? 'source-map' : false;
    ```

* why is publicPath breaking prod build but not dev build? I also don't need publicPath set at all in dev mode for it to work
* comments to everything in the code as a 'how to' as well as documentation in the readme
* potential plugins:
  - CopyWebpackPlugin: copies files directly to /dist but not sure I'd actually need this for anything (maybe favicons?)
  - SourceMapDevToolPlugin
  - UglifyjsWebpackPlugin: already installed buy not being used yet since I probably only want to use it for production builds
  - CompressionPlugin: gzipping - is this even doing anything?
  - CleanWebpackPlugin: may need to tweak the settings
* postcss config file has both cssnano and autoprefixer but not sure they're doing anything, will need to test them somehow
* What I actually need to be able to do:
  - minify, uglify JS
  - react with a premade template ready to go
  - code splitting, vendors
  - source mapping
  - .env?
  - prod vs. dev setups
  - start & build scripts
  - finalize folder structure
  - eslint, stylelint
  - rucksack?
  - cache busting?
* `npm start` is opening 2 browser tabs, one at port 8080 and one at port 3000 and getting a weird console error for the one opening at port 8080 (last time I checked it was not showing the console error anymore)
* how do I use the gzipped files I'm creating when running npm run build? Do they just get created and used automatically when deploying with something like Netlify?
* Check options for all loaders and plugins being used

### Notes from saved Feedly articles:

- can set minimum sizes for files when using optimization.splitChunks
  - will need to look at this further to make sure I'm splitting out vendor, etc. code without code redundandcies in different chunks.
- UglifyJsPlugin is automatically used in production mode. By default it will go over every .js file. The default settings of UglifyJsPlugin are minimize: true and minimizer: UglifyJsPlugin(). Also need to check out the uglifyOptions: {} settings which has a compress: option as well as an output: option. The output option allows you to set drop_console: true (false by default) that removes all console.log calls in the compiled code.
- Look into DefinePlugin to get a better idea of what it does and if I have any use for it
- I think NoEmitOnErrorsPlugin automatically runs in production mode. This stops a new version of the app being created if errors occur that Webpack can't resolve
- Look at ModuleConcatenationPlugin to shrink javascript bundles even more
- Should only use HotModuleReplacementPlugin in dev mode (not prod, which why would you anyway?) because it can cause problems with output using chunkhash
- When using HotMOduleReplacementPlugin, need to add something to js:

```javascript
if (module.hot) {
  module.hot.accept();
}
```

- And this can be added to index.js because it works on anything that is imported into index.js

- for dev mode, look into plugins NamedModulesPlugin, NamedChunksPlugin
- Tree Shaking:
  - in order to use, need to use ES6 modules not CommonJS modules. Babel changes everything to CommonJS so you need to make a setting:
  - In .babelrc or webpack.config file:
    - .babelrc (not sure this syntax is correct):
    - ```javascript
      {
        "presets": [
          ["env",
            {
              "modules": false
            }
          ]
        ]
      }
      ```
    - webpack.config:
    - ```javascript
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env', { modules: false }],
              },
            },
          },
        ];
      }
      ```
  - also need to turn on optimization.usedExports. This is added with mode=production
  - can set optimization.sideEffects: true. This will tree shake when libraries that give notice that they don't have side effects like not being written in ES6
- what is resolve: {extensions: ['.js', '.json', '.css']} doing in a config file?

- check out the stats option for webpack.config file - tons of options for what you'll see in the terminal. One article recommends setting it to detailed or verbose to get the most info.
- running "webpack -p" tells it it's in production mode, but that won't get relayed to the config files using this method
- Should I also chunk split CSS?
- Apparently the DefinePlugin is used to set global constants (env: prod or dev):
