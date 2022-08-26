import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppProvider } from './context/context';
import { Count } from './components/count';
import { Strike } from './components/strike';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          hellohellow
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
      <AppProvider>
        <Count />
        <Strike />
      </AppProvider>
    </div>
  );
}

export default App;
