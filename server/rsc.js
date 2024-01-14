import React from 'react'
import express from 'express';
import { readFileSync } from 'fs';
import path from 'path';

import App from '../app/index.js'

import { renderToPipeableStream } from 'react-server-dom-webpack/server';

const app = express();


app.use('/', (req, res) => {
  const manifest = readFileSync(
    path.resolve(__dirname, '../build/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);
  // server component node 运行时，将 React 组件渲染为 React Flight 流
  const url = req.url;
  const { pipe } = renderToPipeableStream(
    React.createElement(App, {
      url,
    }),
    moduleMap
  );
  pipe(res)
})


app.listen(5556)