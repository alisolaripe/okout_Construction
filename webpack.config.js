const path = require('path');
const appDirectory = path.resolve(__dirname, './');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { presets } = require(`${appDirectory}/babel.config.js`);
const babelLoaderConfiguration = {
  test: /\.js$|jsx/,
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
      presets: presets,
      plugins: ['react-native-web'],
    },
  },
};
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
    path.resolve(appDirectory, 'index.web.js'),
  ],
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },
  module: {
    rules: [imageLoaderConfiguration, fileLoaderConfiguration,babelLoaderConfiguration,
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "./src"),
        // exclude: /node_modules/,
        use: ["babel-loader"],
      },{ test: /\.txt$/, use: 'raw-loader' },{
        test: /\.js$/,
        use: [
          {
            loader:'babel-loader',
          }]},
      {
        test: /\.ts$/,
        use: [
          {
            loader:'babel-loader',
          }]}
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
    },
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV !== 'production' || true,
    }),
  ],

};

