# Webpack 4 + Babel 7 + React 16 Framework

Need to do:

- use optimization splitChunks instead of CommonChunksPlugin
- Best way to put in suite of favicons? HtmlWebpackPlugin says it can automatically inject manifest and favicons in addition to css & js
- figure out webpack-merge and split config files into dev, prod, and common, or at least dev & prod and determine best way to run scripts with production & development modes; start with just a dev and prod config setup and maybe add in webpack-merge stuff later

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
* `npm start` is opening 2 browser tabs, one at port 8080 and one at port 3000 and getting a weird console error for the one opening at port 8080
* how do I use the gzipped files I'm creating when running npm run build? Do they just get created and used automatically when deploying with something like Netlify?
