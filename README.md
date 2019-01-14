# Webpack 4 + Babel 7 + React 16 Framework

## To Do

### publicPath

- Do I need it at all?
- why is using it breaking prod build but not dev? I don't seem to need it in dev build for it to work.

### CSS

- The postCSS config file has both cssnano and autoprefixer but not sure they're actually doing anything. Will need to test somehow.
- Should I be chunk-splitting CSS files?

### Dev Server

- Need to set devServer/serve options correcly in dev config file.

### Hot Module Replacement

- From docs, maybe need to add something to js:

```javascript
if (module.hot) {
  module.hot.accept();
}
```

- And this apparently can be added to index.js because it works on anything that is imported into index.js

### Linting

- Add ESLint and Stylelint
- Add rucksack?
- Add cache busting?

### Tree Shaking

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

### Other

- Comment everything in the code as documentation and to remind myself what stuff does, as well as show others.
- Redo README when done for good documentation.
