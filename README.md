# Webpack 4 + Babel 7 + React 16 Framework

### Need to do:

- List of which plugins/loaders go with dev/prod
- use optimization splitChunks instead of CommonChunksPlugin
- Best way to put in suite of favicons? HtmlWebpackPlugin says it can automatically inject manifest and favicons in addition to css & js
- figure out webpack-merge and split config files into dev, prod, and common, or at least dev & prod and determine best way to run scripts with production & development modes; start with just a dev and prod config setup and maybe add in webpack-merge stuff later
- `production` is the default mode for webpack so keep that in mind when developing "if-then" type stuff in the config file

  - or just have 1 config file, set mode prod or dev in package.json scripts, and have logic in config file to determine what stuff should run in dev or prod modes
  - from Webpack docs:
  - ```javascript
    var config = {
      entry: './src/index.js',
      // ...
    };

    module.exports = (env, argv) => {
      if (argv.mode === 'development') {
        config.devtool = 'source-map';
      }

      if (argv.mode === 'production') {
        // ...
      }
    };

    return config;
    ```

  - Another explanation from Webpack docs on splitting config stuff up:

    - if using a function in config, 1st arg is always env and 2nd is always argv which describes the options passed to webpack
    - ```javascript
      module.exports = function(env, argv) {
        return {
          mode: env.production ? 'production' : 'development',
          devtool: env.production ? 'source-map' : 'eval',
          plugins: [
            new TerserPlugin({
              terserOptions: {
                compress: argv['optimize-minimize'], // only if -p or --optimize-minimize were passed
              },
            }),
          ],
        };
      };
      ```

* why is publicPath breaking prod build but not dev build? I also don't need publicPath set at all in dev mode for it to work
* comments to everything in the code as a 'how to' as well as documentation in the readme
* potential plugins:
  - CopyWebpackPlugin: copies files directly to /dist but not sure I'd actually need this for anything (maybe favicons?)
  - SourceMapDevToolPlugin
  - UglifyjsWebpackPlugin: already installed buy not being used yet since I probably only want to use it for production builds
  - CompressionPlugin: gzipping - is this even doing anything?
  - CleanWebpackPlugin: may need to tweak the settings and/or only use it for production builds
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
* parts I need:
  - entry
  - output
  - loaders
  - plugins
  - working with file types: js (do I need a reference to jsx?), html, css/scss, png, gif, svg, jpg, jpeg

### Notes from saved Feedly articles:

- can set minimum sizes for files when using optimization.splitChunks
  - will need to look at this further to make sure I'm splitting out vendor, etc. code without code redundandcies in different chunks.
- UglifyJsPlugin is automatically used in production mode. By default it will go over every .js file. The default settings of UglifyJsPlugin are minimize: true and minimizer: UglifyJsPlugin(). Also need to check out the uglifyOptions: {} settings which has a compress: option as well as an output: option. The output option allows you to set drop_console: true (false by default) that removes all console.log calls in the compiled code.
- Look into DefinePlugin to get a better idea of what it does and if I have any use for it
- I think NoEmitOnErrorsPlugin automatically runs in production mode. This stops a new version of the app being created if errors occur that Webpack can't resolve
- Look at ModuleConcatenationPlugin to shrink javascript bundles even more
- article I read says that to use hot module replacement correctly:
- ```javascript
  devServer: {
    hot: true
  },
  plugins: ]
    new webpack.HotModuleReplacementPlugin()
  ]
  ```
- Also apparently should only use HotModuleReplacementPlugin in dev mode (not prod, which why would you anyway?) because it can cause problems with output using chunkhash
- When using HotMOduleReplacementPlugin, need to add something to js:

```javascript
if (module.hot) {
  module.hot.accept();
}
```

- And this can be added to index.js because it works on anything that is imported into index.js
- Can set all plugins to a const at top of config file:

```js
const plugins = ['add all plugin code here'];

module.exports = {
  output: {},
  plugins,
  devServer: {
    hot: true,
  },
};
```

for example. Then if mode=prod or mode=dev, you can push other plugins into the plugins array variable:

```js
if ('mode = prod logic goes here') {
  plugins.push(new CompressionPlugin({}));
}
```

- for dev mode, look into plugins NamedModulesPlugin, NamedChunksPlugin
- want to set devTool: to something in dev config
- Tree Shaking:
  - in order to use, need to use ES6 modules not CommonJS modules. Babel changes everything to CommonJS so you need to make a setting:
  - In .babelrc or webpack.config file:
    - .babelrc (not sure this syntax is correct):
    - ```js
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
    - ```js
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
  - also need to use UglifyJsPlugin
  - also need to turn on optimization.usedExports. This is added with mode=production
  - can set optimization.sideEffects: true. This will tree shake when libraries that give notice that they don't have side effects like not being written in ES6
- Can do stuff like: devtool: IS_DEV ? 'source-map' : false where "IS_DEV" is the variable saying if it's in dev mode or not
- what is resolve: {extensions: ['.js', '.json', '.css']} doing in a config file?
- Another example for dev vs prod, where variables common, production, and development are set as arrays with the plugins used in each environment stored in them:

```js
plugins: IS_DEV ? [...common, ...development] : [...common, ...production];
```

- check out the stats option for webpack.config file - tons of options for what you'll see in the terminal. One article recommends setting it to detailed or verbose to get the most info.
- running "webpack -p" tells it it's in production mode, but that won't get relayed to the config files using this method
- Check out webpack-bundle-analyzer
- Should I also chunk split CSS?
- Apparently the DefinePlugin is used to set global constants (env: prod or dev):

```js
var ENV = process.env.NODE_ENV;

var baseConfig = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  ]
};

"scripts": {
  "start": "NODE_ENV=development webpack-dev-server",
  "build": "NODE_ENV=production webpack"
}
```

- And for adding plugins based on which env you're in:

```js
var ENV = process.env.NODE_ENV;

var baseConfig = {
  // ...
  plugins: [],
};

if (ENV === 'production') {
  baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
```
