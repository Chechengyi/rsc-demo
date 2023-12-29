import express from 'express';


import App from '../app/index.js'

import { renderToPipeableStream } from 'react-server-dom-webpack/server';

import register from 'react-server-dom-webpack/node-register';

register()

const app = express();

app.use('/public', express.static('build'))

app.use('/', (req, res) => {
  if (req.url.indexOf('.jsx') >= 0) {
    const { pipe } = renderToPipeableStream(<App url={req.url.replace('.jsx', '')} />)
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