'use client'
import React, { startTransition, useContext } from 'react'
import RouterContext from './context'

function FileButtonList({
  fileList
}) {
  const { navigation } = useContext(RouterContext)
  const [currentFile, setCurrentFile] = React.useState('')
  function handClick(e, fileName) {
    e.preventDefault()
    startTransition(() => {
      setCurrentFile(fileName)
    })
    console.log('fileName', fileName)
    navigation(`/${fileName}`)
  }
  return (
    <div key={currentFile}>
      <p>文章列表:</p>
      {
        fileList.map((item) => (
          <a
            onClick={(e) => handClick(e, item)}
            key={item} href={`/${item}`}
            style={{ marginLeft: 10, backgroundColor: currentFile === item ? 'pink': 'none' }}
          >
            {item}
          </a>
        ))
      }
    </div>
  )
}

/**
 * ssr 时 在 node 端加载 Client Component 使用的是 import()
 * 实际感受下来 babelRegister 只在 require 文件时会转译文件内容
 * 所以这里 写 export default 会导致在 ssr 时报错
 * 
 * 实际开发过程中还是需将代码使用 babe l处理一次，这里简化工作量省掉
 */
module.exports = FileButtonList