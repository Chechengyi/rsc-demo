'use client'
import React, { startTransition } from 'react'

export function FileButtonList({
  fileList
}) {

  const [currentFile, setCurrentFile] = React.useState('')

  function handClick(fileName) {
    startTransition(() => {
      setCurrentFile(fileName)
    })
    console.log('fileName', fileName)
  }
  return (
    <div key={currentFile}>
      <p>文章列表:</p>
      {
        fileList.map((item) => (
          <a
            onClick={() => handClick(item)}
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