import React from 'react';
import Logo from './images/Logo3.svg';
import './App.css';
import { Image, loadTheme } from 'office-ui-fabric-react';
import About from './components/about';
import Portfolio from './components/portfolio';
import {darkTheme, lightTheme} from './themes';
import ContactForm from './components/contactform';

export var currentTheme = darkTheme;

const appStyles = {
    background: currentTheme.palette.white,
    color: currentTheme.palette.black
}

export function ToggleTheme() {
  currentTheme = currentTheme === darkTheme ? lightTheme : darkTheme
}

function App() {
  loadTheme(currentTheme);

  return (
    <div>
      <div style={appStyles} className="App">
        <About />
        <Portfolio />
        <ContactForm />
        <Image src={Logo} width={75} className="App-logo" />
      </div>
    </div>
  );

}

export default App;
