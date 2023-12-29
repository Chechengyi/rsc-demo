import { use } from 'react'
import {createRoot} from 'react-dom/client';
import { createFromFetch } from 'react-server-dom-webpack/client';

function Render(props) {
  if (!props?.content) return null;
  return (
    <div key="root">
      {use(props.content)}
    </div>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(<Render />);

function init() {
  const content = createFromFetch(
    fetch('http://localhost:5555/index.jsx')
  )
  root.render(<Render content={content} />)
}
init()



window.addEventListener('click', function(e) {
  e.stopPropagation()
  e.preventDefault()
  const target = e.target

  if (target.href) {
    const url = `${target.href}.jsx`
    const content = createFromFetch(
      fetch(url)
    )
    console.log('content', content)
    root.render(<Render content={content} />)
  }
})