# Webpack 4 + Babel 7 + React 16 Framework

Need to do:

- use optimization splitChunks instead of CommonChunksPlugin
- Best way to put in suite of favicons? HtmlWebpackPlugin says it can automatically inject manifest and favicons in addition to css & js
- figure out webpack-merge and split config files into dev, prod, and common, or at least dev & prod and determine best way to run scripts with production & development modes; start with just a dev and prod config setup and maybe add in webpack-merge stuff later
- comments to everything in the code as a 'how to' as well as documentation in the readme
- potential plugins:
  - CopyWebpackPlugin: copies files directly to /dist but not sure I'd actually need this for anything (maybe favicons?)
  - SourceMapDevToolPlugin
  - UglifyjsWebpackPlugin: already installed buy not being used yet since I probably only want to use it for production builds
  - CompressionPlugin: gzipping - is this even doing anything?
  - CleanWebpackPlugin: may need to tweak the settings and/or only use it for production builds
- postcss config file has both cssnano and autoprefixer but not sure they're doing anything, will need to test them somehow
- What I actually need to be able to do:
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
