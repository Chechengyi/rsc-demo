import express from 'express';
import { renderToPipeableStream } from 'react-dom/server.node';

import App from '../app/index.js'

const app = express();

app.use('/public', express.static('build'))

app.get('/', (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    // bootstrapScripts: ['/public/main.js'],
    onShellReady() {
      res.setHeader('content-type', 'text/html');
      pipe(res);
    }
  })
})


app.get('/getData', (req, res) => {
  setTimeout(() => {
    res.send(JSON.stringify([
      {
        id: 1,
        title: '1'
      },
      {
        id: 2,
        title: '2',
      }
    ]))
  }, 1000)
})

app.listen(5555)