import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';

function App() {
  const divRef = useRef();
  return (
    <div className="App">
      <button onClick={e => {
        console.log(divRef.current);
        window.fetch('/svg.txt').then(r => {
          console.log(r);
          r.text().then(text => {
            console.log(text);
            addSvg(divRef.current, text);
          });
        });
      }}>Test</button>
      <div ref={divRef} />
    </div >
  );
}

export default App;

function addSvg(div, svg) {
  const tempdiv = document.createElement('div');
  tempdiv.innerHTML = svg;
  const svgElement = tempdiv.firstElementChild;
  const outerHtml = svgElement.outerHTML;
  const blob = new Blob([outerHtml], { type: 'image/svg+xml;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  const image = new Image();
  image.onload = () => {
    image.style.width = '100%';
    image.style.height = '100%';
    div.appendChild(image);
  };
  image.onerror = (e) => alert(
    JSON.stringify(e, ["message", "arguments", "type", "name"])
  );
  image.src = blobUrl;

}