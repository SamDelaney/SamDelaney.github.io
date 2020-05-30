import React from 'react';
import Logo from './images/Logo3.svg';
import './App.css';
import { Image, loadTheme, IconButton, forceUpdate } from 'office-ui-fabric-react';
import About from './components/about';
import Portfolio from './components/portfolio';
import {darkTheme, lightTheme} from './themes';
import ContactForm from './components/contactform';

class App extends React.Component {


  state = {
    theme: darkTheme
  }

  appStyles = {
    background: this.state.theme.palette.white,
    color: this.state.theme.palette.black
  }

  ToggleTheme = () => {
    this.setState((state, ) => { return {theme: state.theme === darkTheme ? lightTheme : darkTheme } } );
    loadTheme(this.state.theme);
    this.forceUpdate();
  }

  render() {
    loadTheme(this.state.theme);
    
    return (
        <div style={this.appStyles} className="App">
          <About />
          <Portfolio theme={this.state.theme}/>
          <ContactForm theme={this.state.theme}/>
          <Image src={Logo} width={75} className="App-logo" />
          <IconButton iconProps={{iconName: "Light", style: {fontSize: 40}}} className="ThemeSwitch" onClick={this.ToggleTheme}></IconButton>
        </div>
    );
  }

}

export default App;
