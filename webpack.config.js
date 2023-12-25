const path = require('path');
const appDirectory = path.resolve(__dirname, './');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { presets } = require(`${appDirectory}/babel.config.js`);
// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {

  test: /\.js$|jsx/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(appDirectory, 'node_modules/react-native-reanimated'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: presets,

      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
  type: 'asset/resource',
  use: {

    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },

  },
};
const fileLoaderConfiguration = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
      },
    },
  ],
};
module.exports = {
  entry: [
    // load any web API polyfills
    path.resolve(appDirectory, 'index.web.js'),
  ],
  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },
  // ...the rest of your config
  module: {
    rules: [imageLoaderConfiguration, fileLoaderConfiguration,babelLoaderConfiguration,
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "./src"),
        exclude: /node_modules/,
        use: ["babel-loader"],
      },{ test: /\.txt$/, use: 'raw-loader' },{
        test: /\.js$/,
        use: [
          {
            loader:'babel-loader',
            options: {
              /* ... */
            },
          }]},
      {
        test: /\.ts$/,
        use: [
          {
            loader:'babel-loader',
            options: {
              /* ... */
            },
          }]}
    ],
  },
  // resolveLoader: {
  //   modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  // },
  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',

    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [
      '.web.js',
      '.js',
      '.web.ts',
      '.ts',
      '.web.jsx',
      '.jsx',
      '.web.tsx',
      '.tsx',
      '.wasm',
      '.json'
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appDirectory + '/public/index.html',
    }),
  ],

};

