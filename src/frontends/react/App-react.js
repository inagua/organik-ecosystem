import logo from './logo.svg';
import './App.css';
import {SVGComponent, Rectangle} from './components/components'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


      <SVGComponent height="50" width="50" />


      <SVGComponent height="100" width="100">
        <Rectangle height="50" width="50" x="25" y="25" />
      </SVGComponent>
    </div>
  );
}



export default App;
