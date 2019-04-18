import React, { Component } from 'react';
import logo from '../../logo.svg';
import '../../assets/css/App.css';
import Cabecalho from '../../Components/NavBar';

class App extends Component {
  render() {
    return (
        <div className="App">
        <Cabecalho/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
