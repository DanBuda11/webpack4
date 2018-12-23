# Webpack 4 + Babel 7 + React 16 Framework

- Do I want bundle analyzer plugin running in both dev and prod?
- is publicPath needed at all?
- properly use serve, devServer options in config along with BrowserSyncPlugin

- why is publicPath breaking prod build but not dev build? I also don't need publicPath set at all in dev mode for it to work
- comments to everything in the code as a 'how to' as well as documentation in the readme
- postcss config file has both cssnano and autoprefixer but not sure they're doing anything, will need to test them somehow
- What I actually need to be able to do:
  - eslint, stylelint
  - rucksack?
  - cache busting?
- `npm start` is opening 2 browser tabs, one at port 8080 and one at port 3000 and getting a weird console error for the one opening at port 8080 (last time I checked it was not showing the console error anymore)
- how do I use the gzipped files I'm creating when running npm run build? Do they just get created and used automatically when deploying with something like Netlify?

### Notes from saved Feedly articles:

- When using HotMOduleReplacementPlugin, need to add something to js:

```javascript
if (module.hot) {
  module.hot.accept();
}
```

- And this can be added to index.js because it works on anything that is imported into index.js

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

- Should I also chunk split CSS?
- Code from original dev config file:

```javascript
  serve: {
    port: 8080,
    content: './dist',
  },
  devServer: {
    contentBase: './src',
    compress: true,
    hot: true,
    open: true,
  },
```

- Code from original prod config file (do I need any of this in prod?):

```javascript
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
```
