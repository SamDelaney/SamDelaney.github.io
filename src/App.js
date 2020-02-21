import React from 'react';
import Logo from './Logo3.svg';
import './App.css';
import {Image} from 'office-ui-fabric-react';
import About from './components/about.jsx';
import Portfolio from './components/portfolio.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Image src={Logo} width={75} className="App-logo"/>
        <About />
        <Portfolio />
      </header>
    </div>
  );
}

export default App;
