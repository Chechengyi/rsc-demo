import React, { Suspense } from 'react'
import { readdir, readFile } from "node:fs/promises";
import path from 'path';

import FileButtonList from './FileButtonLst.js'


function getFileContent(filePath) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(readFile(filePath, 'utf8'))
    }, 2000)
  })
}

function getFileList(dirPath) {
  return readdir(dirPath);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(readdir(dirPath))
  //   }, 2000)
  // })
}

async function FileDetails({ filePath }) {
  const fileContent = await getFileContent(filePath)
  return (
    <p>
      {fileContent}
    </p>
  )
}

export default async function WarpApp(props) {
  return (
    <div id="root">
      <App {...props} />
    </div>
  )
  // return (
  //   <div id="root">
  //     <Suspense fallback={<div>...</div>}>
  //       <App {...props} />
  //     </Suspense>
  //   </div>
  // )
}

async function App(props) {
  const { url = '' } = props || {}
  // const dataFiles = await readdir(path.resolve(__dirname, './data'));
  const dataFiles = await getFileList(path.resolve(__dirname, './data'))

  const urlFileName = url.replace('/', '')
  const targetFilePath = path.resolve(__dirname, `./data/${urlFileName}`);

  return (
    <div>
      <span>搜索：</span><input />
      <hr />
      {/* <div>
        {
          dataFiles.map((item) => <a key={item} href={`/${item}`} style={{ marginLeft: 10 }}>{item}</a>)
        }
      </div> */}
      <FileButtonList fileList={dataFiles} />
      <div>
        filename: {urlFileName}
        {
          dataFiles.includes(urlFileName)?
            <Suspense fallback={<div>loading....</div>}><FileDetails filePath={targetFilePath} /></Suspense> :
            urlFileName ? <p>文件不存在</p> : null
        }
      </div>
    </div>
  )
}