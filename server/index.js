import express from 'express';
import { renderToPipeableStream } from 'react-dom/server.node';

import App from '../app/index.js'

const app = express();

app.use('/public', express.static('build'))

app.use('/', (req, res) => {
  const { pipe } = renderToPipeableStream(<App url={req.url} />, {
    // bootstrapScripts: ['/public/main.js'],
    onShellReady() {
      res.setHeader('content-type', 'text/html');
      pipe(res);
    }
  })
})


app.listen(5555)