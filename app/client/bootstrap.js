import React, { use } from 'react'
import { createRoot } from 'react-dom/client';
import { createFromFetch, createFromReadableStream } from 'react-server-dom-webpack/client';
import RouterContext from '../context'

function App(props) {
  const [content, setContent] = React.useState(props.content)
  function navigation(url) {
    url = `${url}.jsx`
    const content = createFromFetch(
      fetch(url)
    )
    setContent(content)
  }
  return (
    <RouterContext.Provider value={{ navigation }}>
      {use(content)}
    </RouterContext.Provider>
  )
}

const root = createRoot(document.getElementById('root'));
// 因为不知道是服务端传递过来的 React Flight 数据先到
// 还是 main.js 先执行
// 所以服务端传递过来的 script 片段会判断如果 clientFizzReactFlight 方法
// 已经存在就调用这个方法，否则把数据存储到 __initFlight 变量中
window.clientFizzReactFlight = function(str) {
  const rscStream = createFromReadableStream(new Response(str).body)
  root.render(React.createElement(App, {
    content: rscStream
  }))
}
if (window.__initFlight) {
  clientFizzReactFlight(window.__initFlight)
}