'use strict';

const register = require('react-server-dom-webpack/node-register');
register();
const babelRegister = require('@babel/register');

babelRegister({
  ignore: [/[\\\/](build|node_modules)[\\\/]/],
  presets: [['@babel/preset-react', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
});


require('./index')