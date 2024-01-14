'use strict';

const target = process.env.SERVER_TARGET
//https://github.com/facebook/react/issues/27478
if (target === 'ssr') {
  const babelRegister = require('@babel/register');

  babelRegister({
    ignore: [/[\\\/](build|node_modules)[\\\/]/],
    presets: [['@babel/preset-react', {runtime: 'automatic'}]],
    plugins: ['@babel/transform-modules-commonjs'],
  });
  require('./ssr')
}
if (target === 'rsc') {
  const register = require('react-server-dom-webpack/node-register');
  register();
  const babelRegister = require('@babel/register');

  babelRegister({
    ignore: [/[\\\/](build|node_modules)[\\\/]/],
    presets: [['@babel/preset-react', {runtime: 'automatic'}]],
    plugins: ['@babel/transform-modules-commonjs'],
  });
  console.log('启动 rsc')
  require('./rsc')
}
