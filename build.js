const webpack = require('webpack')
const path = require('path')
const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin')

// import webpack from 'webpack'
// import path from 'path'
// // const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin');
// import ReactServerWebpackPlugin from 'react-server-dom-webpack/plugin'

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
webpack({
  mode: 'development',
  entry: path.resolve(__dirname, '/app/client/bootstrap.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ReactServerWebpackPlugin({isServer: false}),
  ]
}, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    process.exit(1);
    return;
  }
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.log('Finished running webpack with errors.');
    info.errors.forEach((e) => console.error(e));
    process.exit(1);
  } else {
    console.log('Finished running webpack.');
  }
})