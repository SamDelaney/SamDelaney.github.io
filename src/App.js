import React from 'react';
import Logo from './images/Logo3.svg';
import './App.css';
import {Image} from 'office-ui-fabric-react';
import About from './components/about.jsx';
import Portfolio from './components/portfolio.jsx'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <About />
        <Portfolio />
        <Image src={Logo} width={75} className="App-logo"/>
      </div>
    </div>
  );
}

export default App;
