// src/App.js
import React from 'react';
import AppRouter from './AppRouter';
import './App.css';

function App() {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <div className="sidebar">
        <nav>
          <ul>
            <li>
            <i className="fas fa-tachometer-alt"></i>
              <a href="/">Dashboard</a>
            </li>
            <li>
            <i className="fas fa-search"></i> 
              <a href="/search">Search</a>
            </li>
            <li>
            <i className="fas fa-chart-bar"></i> 
              <a href="/analysis">Analysis</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
