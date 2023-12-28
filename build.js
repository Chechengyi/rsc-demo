// const webpack = require('webpack')
// const path = require('path')
import webpack from 'webpack'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log('__dirname', path.resolve(__dirname, 'build'))
webpack({
  mode: 'development',
  entry: path.resolve(__dirname, '/app/bootstrap.js'),
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