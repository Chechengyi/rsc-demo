import React from 'react'
import { readdir } from "node:fs/promises";
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);



export default async function App() {
  const dataFiles = await readdir(path.resolve(__dirname, './data'));
  return (
    <html>
      <head>
        <meta charset="utf-8"></meta>
      </head>
      <body>
        <div id="root">
          <span>搜索：</span><input />
          <hr />
          <div>
            {
              dataFiles.map((item) => <a href="#" style={{ marginLeft: 10 }}>{item}</a>)
            }
          </div>
        </div>
      </body>
    </html>
  )
}