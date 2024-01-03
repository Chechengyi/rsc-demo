import React from 'react'
import express from 'express';
import { readFileSync } from 'fs';
import path from 'path';

import App from '../app/index.js'

import { renderToPipeableStream } from 'react-server-dom-webpack/server';


const app = express();

app.use('/public', express.static('build'))

app.use('/', (req, res) => {
  if (req.url.indexOf('.jsx') >= 0) {
    const manifest = readFileSync(
      path.resolve(__dirname, '../build/react-client-manifest.json'),
      'utf8'
    );
    const moduleMap = JSON.parse(manifest);
    const { pipe } = renderToPipeableStream(
      React.createElement(App, {
        url: req.url.replace('.jsx', '')
      }),
      moduleMap,
    )
    pipe(res)
  } else {
    res.setHeader('content-type', 'text/html');
    res.send(
      `
        <html>
          <head></head>
          <body>
            <div id="root"></div>
            <script src="/public/main.js"></script>
          </body>
        </html>
      `
    )
  }
})


app.listen(5555)