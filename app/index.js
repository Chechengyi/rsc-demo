import React from 'react'
import { readdir, readFile } from "node:fs/promises";
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function FileDetails({ filePath }) {
  const fileContent = await readFile(filePath, 'utf8')
  return (
    <p>
      {fileContent}
    </p>
  )
}

export default async function App(props) {
  const { url = '' } = props || {}
  const dataFiles = await readdir(path.resolve(__dirname, './data'));

  const urlFileName = url.replace('/', '')
  const targetFilePath = path.resolve(__dirname, `./data/${urlFileName}`);

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
              dataFiles.map((item) => <a key={item} href={`/${item}`} style={{ marginLeft: 10 }}>{item}</a>)
            }
          </div>
          <div>
            filename: {urlFileName}
            {
              dataFiles.includes(urlFileName)?
                <FileDetails filePath={targetFilePath} /> :
                urlFileName ? <p>文件不存在</p> : null
            }
          </div>
        </div>
      </body>
    </html>
  )
}