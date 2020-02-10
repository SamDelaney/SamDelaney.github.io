import React from 'react';
import logo from './Logo1Purple.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Site under development.
        </p>
        <a
          className="App-link"
          href="https://www.linkedin.com/in/samuel-delaney/"
          target="_blank"
          rel="noopener noreferrer"
        >
          My LinkedIn
        </a>
      </header>
    </div>
  );
}

export default App;
